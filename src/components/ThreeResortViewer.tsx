import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  Maximize2,
  Minimize2,
  Compass,
  Sun,
  Sunset,
  Moon,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

// Scratch math helpers outside render loop (Zero GC)
const _scratchVec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

// Lighting and Camera Presets
type LightingMode = 'day' | 'golden' | 'night';
interface CameraPreset {
  name: string;
  pos: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: CameraPreset[] = [
  { name: 'Panoramic View', pos: [14, 9, 15], target: [0, 2, 0] },
  { name: 'Garden Terrace', pos: [7, 3.5, 7], target: [0, 1.8, 0] },
  { name: 'Pavilion Front', pos: [0.5, 3.2, 11], target: [0, 2, 0] },
  { name: 'Aerial Estate', pos: [0, 18, 14], target: [0, 1, 0] }
];

export const ThreeResortViewer: React.FC<{ isStandalone?: boolean; onToggleExpand?: () => void }> = ({
  isStandalone = false,
  onToggleExpand
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLighting, setActiveLighting] = useState<LightingMode>('day');
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeNote, setActiveNote] = useState('Explore the 3D procedural architecture of Husnain Resort Pavilion & pine gardens.');

  // References to keep mutable three instances across updates without re-mounting
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const lightsRef = useRef<{
    dirLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    lanternLights: THREE.PointLight[];
    lanternMeshes: THREE.Mesh[];
  } | null>(null);

  // Target camera state for smooth exponential damping
  const camAnimRef = useRef({
    isTransitioning: false,
    targetPos: new THREE.Vector3(14, 9, 15),
    targetLook: new THREE.Vector3(0, 2, 0),
    speed: 4.0
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Software WebGL Guard & Color Pipeline
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdce7d9);
    scene.fog = new THREE.FogExp2(0xdce7d9, 0.025);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.2, 100);
    camera.position.set(14, 9, 15);
    cameraRef.current = camera;

    // 4. Studio Environment Setup via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Orbit Controls with Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent diving under ground
    controls.minDistance = 3;
    controls.maxDistance = 35;
    controls.target.set(0, 2, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.addEventListener('start', () => {
      camAnimRef.current.isTransitioning = false;
      setIsAutoRotating(false);
      controls.autoRotate = false;
    });
    controlsRef.current = controls;

    // 6. Lighting Rig
    const dirLight = new THREE.DirectionalLight(0xfff3db, 2.2);
    dirLight.position.set(15, 20, 12);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.camera.left = -12;
    dirLight.shadow.camera.right = 12;
    dirLight.shadow.camera.top = 12;
    dirLight.shadow.camera.bottom = -12;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xe4edff, 0x1b4b3b, 1.1);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // 7. Procedural Textures (HTML5 Canvas - Zero 404 dependencies)
    const createWoodTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#6e4b2d';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#54361e';
      ctx.lineWidth = 2;
      for (let i = 0; i < 256; i += 6) {
        ctx.beginPath();
        ctx.moveTo(0, i + Math.sin(i * 0.1) * 3);
        ctx.lineTo(256, i + Math.cos(i * 0.1) * 3);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const createStoneTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#8a8e8b';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#5f6460';
      ctx.lineWidth = 3;
      // stone paver grid
      for (let y = 0; y < 256; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
        const offset = (y / 32) % 2 === 0 ? 0 : 32;
        for (let x = offset; x < 256; x += 64) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 32);
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const woodTex = createWoodTexture();
    const stoneTex = createStoneTexture();

    // 8. Shared PBR Materials
    const timberMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.75,
      metalness: 0.05
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x1b4b3b, // Pine green alpine tiles
      roughness: 0.45,
      metalness: 0.15
    });

    const stoneMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.85,
      metalness: 0.08
    });

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf7f5ef, // Warm ivory stucco walls
      roughness: 0.9,
      metalness: 0.02
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.45 : 1,
      ior: 1.5,
      reflectivity: 0.9
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xc5a46d,
      roughness: 0.25,
      metalness: 0.85
    });

    const pineFoliageMat = new THREE.MeshStandardMaterial({
      color: 0x12382d,
      roughness: 0.8,
      metalness: 0.05
    });

    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x422d1d,
      roughness: 0.9,
      metalness: 0.05
    });

    const lanternGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffcc77,
      emissive: 0xffaa44,
      emissiveIntensity: 1.8,
      roughness: 0.2
    });

    // 9. Procedural Composite Models (3-12 parts per subject)

    // A. Main Resort Pavilion Group
    const pavilionGroup = new THREE.Group();

    // Part 1: Stepped Plinth Foundation (Stone Terrace Base)
    const baseGeo = new THREE.BoxGeometry(9, 0.6, 7);
    const baseMesh = new THREE.Mesh(baseGeo, stoneMat);
    baseMesh.position.y = 0.3;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    pavilionGroup.add(baseMesh);

    // Part 2: Entrance Stone Steps (3 tiers)
    for (let s = 0; s < 3; s++) {
      const stepGeo = new THREE.BoxGeometry(3.5 - s * 0.4, 0.15, 0.6);
      const stepMesh = new THREE.Mesh(stepGeo, stoneMat);
      stepMesh.position.set(0, 0.1 + s * 0.15, 3.5 + (2 - s) * 0.35);
      stepMesh.receiveShadow = true;
      stepMesh.castShadow = true;
      pavilionGroup.add(stepMesh);
    }

    // Part 3: Main Lodge Building Body (Stucco Walls)
    const mainBodyGeo = new THREE.BoxGeometry(7.2, 3.0, 4.8);
    const mainBody = new THREE.Mesh(mainBodyGeo, wallMat);
    mainBody.position.set(0, 2.1, -0.6);
    mainBody.castShadow = true;
    mainBody.receiveShadow = true;
    pavilionGroup.add(mainBody);

    // Part 4: Recessed Glazed French Windows & Main Portal
    const windowPlates = [
      { x: -2.2, y: 2.1, z: 1.81, w: 1.2, h: 1.8 },
      { x: 2.2, y: 2.1, z: 1.81, w: 1.2, h: 1.8 },
      { x: 0, y: 1.9, z: 1.81, w: 1.6, h: 2.2 } // Doorway
    ];
    windowPlates.forEach((wp) => {
      // Wood frame border
      const frameGeo = new THREE.BoxGeometry(wp.w + 0.15, wp.h + 0.15, 0.08);
      const frame = new THREE.Mesh(frameGeo, timberMat);
      frame.position.set(wp.x, wp.y, wp.z);
      frame.castShadow = true;
      pavilionGroup.add(frame);

      // Glass pane
      const paneGeo = new THREE.PlaneGeometry(wp.w, wp.h);
      const pane = new THREE.Mesh(paneGeo, glassMat);
      pane.position.set(wp.x, wp.y, wp.z + 0.04);
      pavilionGroup.add(pane);
    });

    // Part 5: Front Veranda Columns (Timber Pillars with Plinths and Capitals)
    const columnPositions = [-3.8, -1.9, 1.9, 3.8];
    columnPositions.forEach((colX) => {
      // Column Base
      const cBaseGeo = new THREE.BoxGeometry(0.38, 0.25, 0.38);
      const cBase = new THREE.Mesh(cBaseGeo, stoneMat);
      cBase.position.set(colX, 0.725, 3.0);
      cBase.castShadow = true;
      pavilionGroup.add(cBase);

      // Column Shaft (Octagonal lathe cylinder)
      const cShaftGeo = new THREE.CylinderGeometry(0.12, 0.14, 2.5, 8);
      const cShaft = new THREE.Mesh(cShaftGeo, timberMat);
      cShaft.position.set(colX, 2.05, 3.0);
      cShaft.castShadow = true;
      pavilionGroup.add(cShaft);

      // Column Capital
      const cCapGeo = new THREE.BoxGeometry(0.35, 0.15, 0.35);
      const cCap = new THREE.Mesh(cCapGeo, goldAccentMat);
      cCap.position.set(colX, 3.35, 3.0);
      cCap.castShadow = true;
      pavilionGroup.add(cCap);
    });

    // Part 6: Front Veranda Balustrade (Timber Railing)
    const railSections = [
      { startX: -3.8, endX: -2.0 },
      { startX: 2.0, endX: 3.8 }
    ];
    railSections.forEach((rs) => {
      const len = Math.abs(rs.endX - rs.startX);
      const midX = (rs.startX + rs.endX) / 2;
      // Top rail
      const topRailGeo = new THREE.BoxGeometry(len, 0.08, 0.08);
      const topRail = new THREE.Mesh(topRailGeo, timberMat);
      topRail.position.set(midX, 1.4, 3.0);
      topRail.castShadow = true;
      pavilionGroup.add(topRail);

      // Balusters (5 vertical spindles)
      for (let b = 0; b <= 4; b++) {
        const balusterX = rs.startX + (len * b) / 4;
        const balusterGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.65, 6);
        const baluster = new THREE.Mesh(balusterGeo, timberMat);
        baluster.position.set(balusterX, 1.05, 3.0);
        baluster.castShadow = true;
        pavilionGroup.add(baluster);
      }
    });

    // Part 7: Veranda Support Beam (Rafter Header)
    const headerBeamGeo = new THREE.BoxGeometry(8.2, 0.25, 0.25);
    const headerBeam = new THREE.Mesh(headerBeamGeo, timberMat);
    headerBeam.position.set(0, 3.48, 3.0);
    headerBeam.castShadow = true;
    pavilionGroup.add(headerBeam);

    // Part 8: Multi-Tier Pitched Alpine Roof with Overhangs
    // Lower Veranda Roof Pitch
    const verandaRoofGeo = new THREE.BoxGeometry(8.6, 0.2, 2.4);
    const verandaRoof = new THREE.Mesh(verandaRoofGeo, roofMat);
    verandaRoof.position.set(0, 3.65, 2.0);
    verandaRoof.rotation.x = 0.25;
    verandaRoof.castShadow = true;
    verandaRoof.receiveShadow = true;
    pavilionGroup.add(verandaRoof);

    // Main Gable Roof Structure
    const roofMainGeo = new THREE.ConeGeometry(5.2, 2.6, 4);
    const roofMain = new THREE.Mesh(roofMainGeo, roofMat);
    roofMain.position.set(0, 4.8, -0.6);
    roofMain.rotation.y = Math.PI / 4;
    roofMain.scale.set(1.15, 1, 1.5);
    roofMain.castShadow = true;
    roofMain.receiveShadow = true;
    pavilionGroup.add(roofMain);

    // Roof Ridge Accent & Gable Finial
    const finialGeo = new THREE.CylinderGeometry(0.04, 0.12, 1.1, 8);
    const finial = new THREE.Mesh(finialGeo, goldAccentMat);
    finial.position.set(0, 6.4, -0.6);
    finial.castShadow = true;
    pavilionGroup.add(finial);

    // Part 9: Stone Fireplace Chimney on Side
    const chimneyGeo = new THREE.BoxGeometry(0.9, 4.2, 0.9);
    const chimney = new THREE.Mesh(chimneyGeo, stoneMat);
    chimney.position.set(-3.7, 3.8, -0.6);
    chimney.castShadow = true;
    chimney.receiveShadow = true;
    pavilionGroup.add(chimney);

    const chimneyCapGeo = new THREE.BoxGeometry(1.1, 0.15, 1.1);
    const chimneyCap = new THREE.Mesh(chimneyCapGeo, timberMat);
    chimneyCap.position.set(-3.7, 5.95, -0.6);
    pavilionGroup.add(chimneyCap);

    // Part 10: Warm Lantern Sconces (with PointLight glow)
    const lanternLights: THREE.PointLight[] = [];
    const lanternMeshes: THREE.Mesh[] = [];
    const lanternCoords = [
      { x: -1.3, y: 2.6, z: 1.9 },
      { x: 1.3, y: 2.6, z: 1.9 },
      { x: -3.8, y: 2.4, z: 3.0 },
      { x: 3.8, y: 2.4, z: 3.0 }
    ];

    lanternCoords.forEach((lc) => {
      // Lantern housing bracket
      const bracketGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 6);
      const bracket = new THREE.Mesh(bracketGeo, goldAccentMat);
      bracket.position.set(lc.x, lc.y + 0.1, lc.z);
      pavilionGroup.add(bracket);

      // Lantern glowing glass body
      const lBodyGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.22, 6);
      const lBody = new THREE.Mesh(lBodyGeo, lanternGlowMat);
      lBody.position.set(lc.x, lc.y, lc.z);
      pavilionGroup.add(lBody);
      lanternMeshes.push(lBody);

      // Dedicated PointLight
      const pLight = new THREE.PointLight(0xffa834, 1.2, 5.5);
      pLight.position.set(lc.x, lc.y, lc.z);
      pavilionGroup.add(pLight);
      lanternLights.push(pLight);
    });

    // Part 11: Front Welcome Board ("HUSNAIN RESORT")
    const signBoardGeo = new THREE.BoxGeometry(2.2, 0.35, 0.05);
    const signBoard = new THREE.Mesh(signBoardGeo, timberMat);
    signBoard.position.set(0, 3.15, 1.83);
    signBoard.castShadow = true;
    pavilionGroup.add(signBoard);

    const signPlaqueGeo = new THREE.BoxGeometry(2.0, 0.25, 0.06);
    const signPlaque = new THREE.Mesh(signPlaqueGeo, goldAccentMat);
    signPlaque.position.set(0, 3.15, 1.84);
    pavilionGroup.add(signPlaque);

    scene.add(pavilionGroup);

    // B. Landscape: Manicured Lawn Plateau, Meandering Cobblestone Path & Contact Shadow Grounding
    // Radial Contact Shadow Plane under pavilion
    const contactShadowGeo = new THREE.PlaneGeometry(12, 10);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x07150f,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.02, 0);
    scene.add(contactShadow);

    // Terraced Ground Plane
    const groundGeo = new THREE.CylinderGeometry(18, 19, 0.8, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x27553b, // Deep lush mountain lawn
      roughness: 0.9,
      metalness: 0.02
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.4;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Flagstone Meandering Pathway to Entrance
    const pathGroup = new THREE.Group();
    for (let p = 0; p < 8; p++) {
      const stonePaverGeo = new THREE.CylinderGeometry(0.55 + (p % 2) * 0.1, 0.6, 0.05, 8);
      const paver = new THREE.Mesh(stonePaverGeo, stoneMat);
      const zOffset = 5.0 + p * 1.1;
      const xOffset = Math.sin(p * 0.7) * 0.5;
      paver.position.set(xOffset, 0.03, zOffset);
      paver.rotation.y = (p * Math.PI) / 6;
      paver.receiveShadow = true;
      pathGroup.add(paver);
    }
    scene.add(pathGroup);

    // C. Composite 3-12 Part Pine Trees (Mansehra Hazara Pine Forest)
    const createPineTree = (x: number, z: number, scale: number, rotationY: number) => {
      const treeGroup = new THREE.Group();

      // Part 1: Flared Trunk with Root Base
      const trunkGeo = new THREE.CylinderGeometry(0.18 * scale, 0.3 * scale, 2.2 * scale, 8);
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.1 * scale;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Parts 2-5: 4-Tiered Conical Coniferous Foliage Boughs (Varied radius and height)
      const tiers = [
        { y: 1.8 * scale, r: 1.6 * scale, h: 2.0 * scale },
        { y: 2.8 * scale, r: 1.3 * scale, h: 1.8 * scale },
        { y: 3.7 * scale, r: 1.0 * scale, h: 1.6 * scale },
        { y: 4.5 * scale, r: 0.6 * scale, h: 1.3 * scale }
      ];

      tiers.forEach((t) => {
        const tierGeo = new THREE.ConeGeometry(t.r, t.h, 7);
        const bough = new THREE.Mesh(tierGeo, pineFoliageMat);
        bough.position.y = t.y;
        bough.rotation.y = rotationY + (t.y * 0.5);
        bough.castShadow = true;
        bough.receiveShadow = true;
        treeGroup.add(bough);
      });

      // Part 6: Tree Contact Shadow Plane
      const treeShadowGeo = new THREE.CircleGeometry(1.4 * scale, 12);
      const treeShadow = new THREE.Mesh(treeShadowGeo, contactShadowMat);
      treeShadow.rotation.x = -Math.PI / 2;
      treeShadow.position.set(0, 0.02, 0);
      treeGroup.add(treeShadow);

      treeGroup.position.set(x, 0, z);
      return treeGroup;
    };

    // Plant realistic pine groves around the perimeter
    const treePositions = [
      { x: -6.5, z: -3.5, s: 1.2, r: 0.4 },
      { x: -7.8, z: 1.5, s: 1.0, r: 1.2 },
      { x: -5.5, z: 4.8, s: 0.85, r: 2.1 },
      { x: 6.8, z: -3.2, s: 1.3, r: 0.9 },
      { x: 7.5, z: 2.0, s: 1.1, r: 2.5 },
      { x: 5.8, z: 5.2, s: 0.9, r: 1.8 },
      { x: -2.5, z: -5.5, s: 1.4, r: 0.1 },
      { x: 3.0, z: -5.8, s: 1.35, r: 1.6 },
      { x: -8.5, z: 6.2, s: 0.95, r: 3.0 },
      { x: 8.5, z: 6.0, s: 1.05, r: 0.7 }
    ];

    treePositions.forEach((tp) => {
      scene.add(createPineTree(tp.x, tp.z, tp.s, tp.r));
    });

    // D. Decorative Garden Shrubs & Stone Planters
    const shrubGeo = new THREE.DodecahedronGeometry(0.4, 1);
    const shrubMat = new THREE.MeshStandardMaterial({
      color: 0x225e3f,
      roughness: 0.85
    });
    for (let sb = 0; sb < 6; sb++) {
      const shrub = new THREE.Mesh(shrubGeo, shrubMat);
      const sx = (sb < 3 ? -4.8 : 4.8) + (sb % 3) * 0.3;
      const sz = 2.0 + (sb % 3) * 1.2;
      shrub.position.set(sx, 0.3, sz);
      shrub.castShadow = true;
      scene.add(shrub);
    }

    lightsRef.current = {
      dirLight,
      hemiLight,
      lanternLights,
      lanternMeshes
    };

    // Pre-warm shader pipeline once
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 10. Frame Loop with Smooth Exponential Damping & Software Gl Pacing
    let frameId = 0;
    let lastTime = performance.now();

    const updateCameraTransition = (dt: number) => {
      const anim = camAnimRef.current;
      if (!anim.isTransitioning) return;

      const factor = 1 - Math.exp(-anim.speed * dt);
      camera.position.lerp(anim.targetPos, factor);
      controls.target.lerp(anim.targetLook, factor);

      if (camera.position.distanceTo(anim.targetPos) < 0.05 && controls.target.distanceTo(anim.targetLook) < 0.05) {
        camera.position.copy(anim.targetPos);
        controls.target.copy(anim.targetLook);
        anim.isTransitioning = false;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      updateCameraTransition(dt);
      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      controls.dispose();
      renderer.dispose();
      woodTex.dispose();
      stoneTex.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update lighting mode dynamically
  const applyLightingMode = (mode: LightingMode) => {
    setActiveLighting(mode);
    const scene = sceneRef.current;
    const lights = lightsRef.current;
    if (!scene || !lights) return;

    if (mode === 'day') {
      scene.background = new THREE.Color(0xdce7d9);
      if (scene.fog) scene.fog.color = new THREE.Color(0xdce7d9);
      lights.dirLight.color.setHex(0xfff3db);
      lights.dirLight.intensity = 2.2;
      lights.dirLight.position.set(15, 20, 12);
      lights.hemiLight.color.setHex(0xe4edff);
      lights.hemiLight.groundColor.setHex(0x1b4b3b);
      lights.hemiLight.intensity = 1.1;
      lights.lanternLights.forEach((pl) => (pl.intensity = 0.4));
      setActiveNote('Daylight Mode: Fresh morning crispness over the Mansehra pine ridge.');
    } else if (mode === 'golden') {
      scene.background = new THREE.Color(0xe8c79a);
      if (scene.fog) scene.fog.color = new THREE.Color(0xe8c79a);
      lights.dirLight.color.setHex(0xff9944);
      lights.dirLight.intensity = 2.6;
      lights.dirLight.position.set(22, 9, 8);
      lights.hemiLight.color.setHex(0xffc599);
      lights.hemiLight.groundColor.setHex(0x2d1f14);
      lights.hemiLight.intensity = 0.9;
      lights.lanternLights.forEach((pl) => (pl.intensity = 1.6));
      setActiveNote('Golden Hour Mode: Warm amber sunset cascading across the resort timber eaves.');
    } else if (mode === 'night') {
      scene.background = new THREE.Color(0x0e1c18);
      if (scene.fog) scene.fog.color = new THREE.Color(0x0e1c18);
      lights.dirLight.color.setHex(0x3d5f66);
      lights.dirLight.intensity = 0.45;
      lights.dirLight.position.set(-10, 15, -10);
      lights.hemiLight.color.setHex(0x1a2b27);
      lights.hemiLight.groundColor.setHex(0x0a1411);
      lights.hemiLight.intensity = 0.4;
      lights.lanternLights.forEach((pl) => (pl.intensity = 3.5));
      setActiveNote('Night Twilight Mode: Ambient garden lantern glow under the starry northern skies.');
    }
  };

  // Smooth camera preset transition
  const applyCameraPreset = (index: number) => {
    setActivePresetIndex(index);
    const preset = CAMERA_PRESETS[index];
    const anim = camAnimRef.current;
    anim.targetPos.set(...preset.pos);
    anim.targetLook.set(...preset.target);
    anim.isTransitioning = true;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
    setIsAutoRotating(false);
  };

  const toggleAutoRotate = () => {
    if (!controlsRef.current) return;
    const nextState = !isAutoRotating;
    setIsAutoRotating(nextState);
    controlsRef.current.autoRotate = nextState;
  };

  return (
    <div className={`relative w-full overflow-hidden bg-[#12382D] ${isStandalone ? 'h-[85vh]' : 'h-[540px] md:h-[620px] rounded-2xl shadow-2xl'}`}>
      {/* 3D Canvas Ref Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Badge: Specification & Architecture Readout */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-2 bg-[#12382D]/85 border border-[#C5A46D]/30 text-[#F7F5EF] px-3.5 py-1.5 rounded-md backdrop-none text-xs font-cinzel tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>Husnain Resort — 3D Architecture</span>
        </div>
        <div className="text-[11px] text-[#DCE7D9]/80 font-mono pl-1">
          SRSP Link Rd, Mansehra • Procedural Studio PBR
        </div>
      </div>

      {/* Top Right Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={toggleAutoRotate}
          title={isAutoRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
          className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors border ${
            isAutoRotating
              ? 'bg-[#1B4B3B] text-[#F7F5EF] border-[#C5A46D]/40'
              : 'bg-[#12382D]/80 text-[#DCE7D9] border-white/10 hover:bg-[#1B4B3B]'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">{isAutoRotating ? 'Rotating' : 'Orbit'}</span>
        </button>

        {onToggleExpand && (
          <button
            onClick={onToggleExpand}
            title={isStandalone ? 'Exit Full View' : 'Fullscreen 3D View'}
            className="p-2 rounded-md bg-[#12382D]/80 hover:bg-[#1B4B3B] text-[#F7F5EF] border border-white/10 transition-colors"
          >
            {isStandalone ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-20 left-4 z-10 hidden lg:flex items-center gap-2 text-xs text-[#F7F5EF]/70 bg-[#12382D]/80 border border-white/10 px-3 py-1.5 rounded-md pointer-events-none">
        <Info className="w-3.5 h-3.5 text-[#C5A46D]" />
        <span>Drag to orbit • Scroll to zoom • Right-click to pan</span>
      </div>

      {/* Consolidated Collapsible Bottom Control Dock (Direct Three.js Skill Directive) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-300 w-[94%] max-w-[820px] ${
          isDockCollapsed ? 'bottom-2' : 'bottom-4'
        }`}
      >
        {/* Dock Header & Toggle Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#12382D] hover:bg-[#1B4B3B] border border-b-0 border-[#C5A46D]/40 text-[#F7F5EF] text-xs rounded-t-md font-medium tracking-wide transition-colors shadow-lg cursor-pointer"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Show 3D View Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Hide Controls (Zen Mode)</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Body (Solid surface, zero backdrop-blur per Three.js skill) */}
        {!isDockCollapsed && (
          <div className="bg-[#12382D] border border-[#C5A46D]/40 rounded-xl p-3 sm:p-4 text-[#F7F5EF] shadow-2xl flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Lighting Mode Selector */}
              <div className="flex items-center gap-1.5 bg-[#1B4B3B]/60 p-1 rounded-lg border border-white/5">
                <span className="text-[11px] font-semibold text-[#DCE7D9] px-2 uppercase tracking-wider font-cinzel">
                  Lighting:
                </span>
                <button
                  onClick={() => applyLightingMode('day')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    activeLighting === 'day'
                      ? 'bg-[#C5A46D] text-[#12382D] font-semibold'
                      : 'text-[#F7F5EF] hover:bg-white/10'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Day</span>
                </button>
                <button
                  onClick={() => applyLightingMode('golden')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    activeLighting === 'golden'
                      ? 'bg-[#C5A46D] text-[#12382D] font-semibold'
                      : 'text-[#F7F5EF] hover:bg-white/10'
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5" />
                  <span>Sunset</span>
                </button>
                <button
                  onClick={() => applyLightingMode('night')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    activeLighting === 'night'
                      ? 'bg-[#C5A46D] text-[#12382D] font-semibold'
                      : 'text-[#F7F5EF] hover:bg-white/10'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Night</span>
                </button>
              </div>

              {/* Camera Presets Selector */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-[#DCE7D9] px-1 uppercase tracking-wider font-cinzel">
                  Perspective:
                </span>
                {CAMERA_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    onClick={() => applyCameraPreset(idx)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all border ${
                      activePresetIndex === idx
                        ? 'bg-[#F7F5EF] text-[#12382D] border-white font-semibold'
                        : 'bg-[#1B4B3B]/60 text-[#DCE7D9] border-white/5 hover:bg-[#1B4B3B] hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Architectural Note Bar */}
            <div className="text-[11px] text-[#DCE7D9]/90 border-t border-white/10 pt-2 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
              <span className="truncate">{activeNote}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
