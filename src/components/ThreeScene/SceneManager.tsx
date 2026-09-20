import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const SceneManager: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isMobile = window.innerWidth < 768;

    // ==========================================
    // THREE.JS SCENE SETUP
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.012);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      350
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ==========================================
    // RESPONSIVE CAMERA ADAPTATION (Phones, Tablets & Laptops)
    // ==========================================
    let baseZ = 7.5;
    const updateResponsiveCamera = () => {
      const aspect = window.innerWidth / window.innerHeight;
      isMobile = window.innerWidth < 768;

      if (aspect < 0.8) {
        // Mobile phone portrait
        camera.fov = 62;
        baseZ = 10.5;
      } else if (aspect < 1.2) {
        // Tablet portrait / square
        camera.fov = 54;
        baseZ = 8.8;
      } else {
        // Laptop & Desktop widescreen
        camera.fov = 48;
        baseZ = 7.5;
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    };

    updateResponsiveCamera();

    // ==========================================
    // HDR ENVIRONMENT MAP (Realistic Chrome & Glass Refraction)
    // ==========================================
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // ==========================================
    // LIGHTING SYSTEM
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x60a5fa, 3.5);
    keyLight.position.set(8, 10, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 3.0);
    rimLight.position.set(-8, -6, 4);
    scene.add(rimLight);

    const cameraLight = new THREE.PointLight(0x38bdf8, 2.5, 45);
    scene.add(cameraLight);

    // ==========================================
    // DEEP COSMIC STARFIELD & FLOATING DUST PARTICLES
    // ==========================================
    const dustCount = isMobile ? 220 : 650;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 40;
      dustPositions[i + 1] = (Math.random() - 0.5) * 40;
      dustPositions[i + 2] = 12 - Math.random() * 280;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xcfd8dc,
      size: isMobile ? 0.04 : 0.06,
      transparent: true,
      opacity: 0.5,
    });
    const dustField = new THREE.Points(dustGeom, dustMat);
    scene.add(dustField);

    // ==========================================
    // 0. HERO: HIGH-END METALLIC & REFRACTIVE GLASS CORE (z = 0)
    // ==========================================
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);
    scene.add(heroGroup);

    // 1. Inner Pulsating Organic Nucleus
    const nucleusGeom = new THREE.IcosahedronGeometry(1.2, isMobile ? 2 : 4);
    const nucleusMat = new THREE.MeshPhysicalMaterial({
      color: 0x050c1e,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.8,
      metalness: 0.85,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
    heroGroup.add(nucleusMesh);
    const originalNucleusPositions = nucleusGeom.attributes.position.clone();

    // 2. Translucent Refractive Glass Shell
    const glassGeom = new THREE.IcosahedronGeometry(1.48, isMobile ? 1 : 2);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.52,
      thickness: 1.5,
      specularIntensity: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });
    const glassShell = new THREE.Mesh(glassGeom, glassMat);
    heroGroup.add(glassShell);

    // 3. Segmented Mirror-Chrome Exoskeleton Ribs
    const chromeGroup = new THREE.Group();
    heroGroup.add(chromeGroup);

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 1.0,
      roughness: 0.06,
    });

    const ribCount = isMobile ? 4 : 6;
    for (let r = 0; r < ribCount; r++) {
      const arcGeom = new THREE.TorusGeometry(1.7, 0.04, 12, isMobile ? 32 : 64, Math.PI * 0.7);
      const rib = new THREE.Mesh(arcGeom, chromeMat);
      rib.rotation.set((r * Math.PI) / 3, ((r + 1) * Math.PI) / 4, (r * Math.PI) / 6);
      chromeGroup.add(rib);
    }

    // 4. Floating Mirror-Polished Orbital Shards
    const shardCount = isMobile ? 24 : 48;
    const heroShards: { mesh: THREE.Mesh; origPos: THREE.Vector3; rotSpeed: THREE.Vector3 }[] = [];
    const shardGeom = new THREE.OctahedronGeometry(0.22, 0);

    for (let i = 0; i < shardCount; i++) {
      const shard = new THREE.Mesh(shardGeom, chromeMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.0 + Math.random() * 1.1;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      shard.position.set(x, y, z);
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      heroGroup.add(shard);

      heroShards.push({
        mesh: shard,
        origPos: new THREE.Vector3(x, y, z),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.035
        ),
      });
    }

    // 5. Multi-Axis Precision Gyroscopic Rings
    const gyroMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.12,
    });
    const gyroRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.85, 0.02, 12, isMobile ? 36 : 80),
      gyroMat
    );
    gyroRing1.rotation.x = Math.PI / 3;
    heroGroup.add(gyroRing1);

    const laserRingGeom = new THREE.TorusGeometry(3.1, 0.012, 12, isMobile ? 36 : 80);
    const laserRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const gyroRing2 = new THREE.Mesh(laserRingGeom, laserRingMat);
    gyroRing2.rotation.y = Math.PI / 4;
    gyroRing2.rotation.z = Math.PI / 6;
    heroGroup.add(gyroRing2);

    const innerLight = new THREE.PointLight(0x38bdf8, 3.5, 8);
    heroGroup.add(innerLight);

    // ==========================================
    // 1. ABOUT & SKILLS: Floating Digital Architecture (z = -28)
    // ==========================================
    const archGroup = new THREE.Group();
    archGroup.position.set(0, 0, -28);
    scene.add(archGroup);

    const techNodes: THREE.Mesh[] = [];
    const techNodeGeom = new THREE.IcosahedronGeometry(0.55, 0);
    const techNodeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
    });

    const nodeCount = 8;
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(techNodeGeom, techNodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = isMobile ? 2.6 : 3.4;
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 2);
      archGroup.add(node);
      techNodes.push(node);
    }

    const archRing = new THREE.Mesh(
      new THREE.RingGeometry(isMobile ? 2.5 : 3.1, isMobile ? 2.54 : 3.14, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })
    );
    archGroup.add(archRing);

    // ==========================================
    // 2. PROJECT 01: HandDance 3D Smartphone & Gesture Rig (z = -58)
    // ==========================================
    const handGroup = new THREE.Group();
    handGroup.position.set(0, 0, -58);
    scene.add(handGroup);

    const phoneGeom = new THREE.BoxGeometry(3.2, 5.8, 0.25);
    const phoneMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b0f19,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
    });
    const phoneMesh = new THREE.Mesh(phoneGeom, phoneMat);
    handGroup.add(phoneMesh);

    const phoneWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(phoneGeom),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
    );
    handGroup.add(phoneWire);

    const handNodeGeom = new THREE.SphereGeometry(0.08, 10, 10);
    const handNodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const handNodes: THREE.Mesh[] = [];

    const landmarkPositions = [
      new THREE.Vector3(0, -1.2, 0.2),       // Wrist
      new THREE.Vector3(-0.45, -0.7, 0.25),  // Thumb CMC
      new THREE.Vector3(-0.8, -0.2, 0.3),   // Thumb MCP
      new THREE.Vector3(-1.0, 0.15, 0.35),  // Thumb IP
      new THREE.Vector3(-1.15, 0.5, 0.4),   // Thumb Tip
      new THREE.Vector3(-0.4, 0.1, 0.2),    // Index MCP
      new THREE.Vector3(-0.45, 0.7, 0.25),  // Index PIP
      new THREE.Vector3(-0.5, 1.1, 0.3),    // Index DIP
      new THREE.Vector3(-0.55, 1.5, 0.35),  // Index Tip
      new THREE.Vector3(0, 0.15, 0.2),      // Middle MCP
      new THREE.Vector3(0, 0.8, 0.25),      // Middle PIP
      new THREE.Vector3(0, 1.25, 0.3),      // Middle DIP
      new THREE.Vector3(0, 1.65, 0.35),     // Middle Tip
      new THREE.Vector3(0.4, 0.1, 0.2),     // Ring MCP
      new THREE.Vector3(0.45, 0.7, 0.25),   // Ring PIP
      new THREE.Vector3(0.48, 1.1, 0.3),    // Ring DIP
      new THREE.Vector3(0.5, 1.45, 0.35),   // Ring Tip
      new THREE.Vector3(0.75, -0.05, 0.2),  // Pinky MCP
      new THREE.Vector3(0.85, 0.4, 0.25),   // Pinky PIP
      new THREE.Vector3(0.9, 0.75, 0.3),    // Pinky DIP
      new THREE.Vector3(0.95, 1.1, 0.35)    // Pinky Tip
    ];

    landmarkPositions.forEach((pos) => {
      const mesh = new THREE.Mesh(handNodeGeom, handNodeMat);
      mesh.position.copy(pos);
      handGroup.add(mesh);
      handNodes.push(mesh);
    });

    const handIndices = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [5,9],[9,10],[10,11],[11,12],
      [9,13],[13,14],[14,15],[15,16],
      [13,17],[17,18],[18,19],[19,20],
      [0,17]
    ];
    const handLinePts: THREE.Vector3[] = [];
    handIndices.forEach(([a, b]) => {
      handLinePts.push(landmarkPositions[a], landmarkPositions[b]);
    });
    const handLineGeom = new THREE.BufferGeometry().setFromPoints(handLinePts);
    const handLines = new THREE.LineSegments(
      handLineGeom,
      new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.85 })
    );
    handGroup.add(handLines);

    // ==========================================
    // 3. PROJECT 02: PlanoVision Retail Scanner Environment (z = -88)
    // ==========================================
    const retailGroup = new THREE.Group();
    retailGroup.position.set(0, 0, -88);
    scene.add(retailGroup);

    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2,
    });
    for (let s = -1; s <= 1; s++) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.1, 2.0), shelfMat);
      shelf.position.set(0, s * 1.5, 0);
      retailGroup.add(shelf);
    }

    const boxGroup = new THREE.Group();
    retailGroup.add(boxGroup);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const boxGeom = new THREE.BoxGeometry(0.85, 1.1, 0.65);
        const boxWire = new THREE.LineSegments(
          new THREE.EdgesGeometry(boxGeom),
          new THREE.LineBasicMaterial({
            color: (r + c) % 2 === 0 ? 0x38bdf8 : 0xa855f7,
            transparent: true,
            opacity: 0.85,
          })
        );
        boxWire.position.set((c - 1.5) * 1.4, (r - 0.5) * 1.5 + 0.6, 0);
        boxGroup.add(boxWire);
      }
    }

    const laserPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 0.06),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
    );
    retailGroup.add(laserPlane);

    // ==========================================
    // 4. PROJECT 03: GSTify SaaS Floating Glass Panels (z = -118)
    // ==========================================
    const saasGroup = new THREE.Group();
    saasGroup.position.set(0, 0, -118);
    scene.add(saasGroup);

    const glassSlabMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.2,
      roughness: 0.08,
      transmission: 0.9,
      transparent: true,
      opacity: 0.75,
      clearcoat: 1.0,
    });

    const slab1 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.2, 0.12), glassSlabMat);
    slab1.rotation.y = -0.28;
    slab1.position.set(-1.4, 0, 0);
    saasGroup.add(slab1);

    const slab2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.4, 0.12), glassSlabMat);
    slab2.rotation.y = 0.32;
    slab2.position.set(1.6, 0.4, 0.8);
    saasGroup.add(slab2);

    for (let i = 0; i < 5; i++) {
      const h = 0.7 + i * 0.45;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, h, 0.35),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x2563eb,
          emissiveIntensity: 0.4,
          metalness: 0.9,
          roughness: 0.1,
        })
      );
      bar.position.set((i - 2) * 0.65, -1.1 + h / 2, 0.25);
      saasGroup.add(bar);
    }

    // ==========================================
    // 5. PROJECT 04: VoiceForge 3D Audio Spectrum (z = -148)
    // ==========================================
    const waveGroup = new THREE.Group();
    waveGroup.position.set(0, 0, -148);
    scene.add(waveGroup);

    const wavePointsCount = 80;
    const wavePositions = new Float32Array(wavePointsCount * 3);
    for (let i = 0; i < wavePointsCount; i++) {
      const x = (i / wavePointsCount - 0.5) * 8.5;
      wavePositions[i * 3] = x;
      wavePositions[i * 3 + 1] = 0;
      wavePositions[i * 3 + 2] = 0;
    }
    const waveGeom = new THREE.BufferGeometry();
    waveGeom.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    const waveLine = new THREE.Line(
      waveGeom,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 })
    );
    waveGroup.add(waveLine);

    const waveLine2 = new THREE.Line(
      waveGeom.clone(),
      new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 })
    );
    waveGroup.add(waveLine2);

    const audioPCount = isMobile ? 50 : 150;
    const audioPGeom = new THREE.BufferGeometry();
    const audioPPositions = new Float32Array(audioPCount * 3);
    for (let p = 0; p < audioPCount * 3; p += 3) {
      audioPPositions[p] = (Math.random() - 0.5) * 9;
      audioPPositions[p + 1] = (Math.random() - 0.5) * 3.5;
      audioPPositions[p + 2] = (Math.random() - 0.5) * 4.5;
    }
    audioPGeom.setAttribute('position', new THREE.BufferAttribute(audioPPositions, 3));
    const audioParticles = new THREE.Points(
      audioPGeom,
      new THREE.PointsMaterial({ color: 0x818cf8, size: 0.08, transparent: true, opacity: 0.75 })
    );
    waveGroup.add(audioParticles);

    // ==========================================
    // 6. AUTH PORTAL & CLIENT VIEWPORTS (z = -178)
    // ==========================================
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, -178);
    scene.add(portalGroup);

    const hexRing = new THREE.Mesh(
      new THREE.RingGeometry(2.5, 2.6, 6),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    portalGroup.add(hexRing);

    const innerHex = new THREE.Mesh(
      new THREE.RingGeometry(1.7, 1.78, 6),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    portalGroup.add(innerHex);

    const browser1 = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 2.2, 0.05)),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 })
    );
    browser1.position.set(-1.9, 0, 1.6);
    browser1.rotation.y = 0.32;
    portalGroup.add(browser1);

    const browser2 = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 2.2, 0.05)),
      new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 })
    );
    browser2.position.set(1.9, 0, 1.6);
    browser2.rotation.y = -0.32;
    portalGroup.add(browser2);

    // ==========================================
    // 7. CONTACT: THE PRISTINE RECONSTRUCTED CORE (z = -215)
    // ==========================================
    const loopGroup = new THREE.Group();
    loopGroup.position.set(0, 0, -215);
    scene.add(loopGroup);

    const loopCore = new THREE.Mesh(nucleusGeom.clone(), nucleusMat.clone());
    loopGroup.add(loopCore);

    const loopGlass = new THREE.Mesh(glassGeom.clone(), glassMat.clone());
    loopGroup.add(loopGlass);

    const loopShards: { mesh: THREE.Mesh; origPos: THREE.Vector3 }[] = [];
    for (let i = 0; i < shardCount; i++) {
      const sMesh = new THREE.Mesh(shardGeom, chromeMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.0 + Math.random() * 1.1;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      sMesh.position.set(x * 3.5, y * 3.5, z * 3.5);
      loopGroup.add(sMesh);
      loopShards.push({ mesh: sMesh, origPos: new THREE.Vector3(x, y, z) });
    }

    // ==========================================
    // MOUSE & TOUCH TRACKING WITH SMOOTH LERP
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let targetZ = baseZ;
    let currentZ = baseZ;
    let currentProgress = 0;
    let targetProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch support for phones and tablets
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth - 0.5) * 1.8;
        mouse.targetY = -(touch.clientY / window.innerHeight - 0.5) * 1.8;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateResponsiveCamera);

    // ==========================================
    // ANIMATION ENGINE LOOP
    // ==========================================
    let animId: number;
    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Mouse & touch Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Scroll Lerp
      currentProgress += (targetProgress - currentProgress) * 0.065;

      // Continuous camera flythrough along Z axis adapted for phone / tablet
      targetZ = baseZ - currentProgress * 222.5;
      currentZ += (targetZ - currentZ) * 0.08;

      if (!isReducedMotion) {
        camera.position.z = currentZ;
        camera.position.x += (mouse.x * (isMobile ? 0.7 : 1.3) - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * (isMobile ? 0.6 : 1.1) - camera.position.y) * 0.05;
        camera.lookAt(camera.position.x * 0.35, camera.position.y * 0.35, camera.position.z - 9);

        keyLight.position.x = 8 + mouse.x * 4;
        keyLight.position.y = 10 + mouse.y * 4;
      } else {
        camera.position.z = currentZ;
      }

      cameraLight.position.set(camera.position.x, camera.position.y, camera.position.z);

      // Organic Wave Deformation on Nucleus
      const posAttr = nucleusGeom.attributes.position;
      const origPositions = originalNucleusPositions.array;
      for (let i = 0; i < posAttr.count; i++) {
        const ox = origPositions[i * 3];
        const oy = origPositions[i * 3 + 1];
        const oz = origPositions[i * 3 + 2];
        const wave = 1.0 + Math.sin(ox * 3 + elapsed * 2.5) * Math.cos(oy * 3 + elapsed * 2) * 0.08;
        posAttr.setXYZ(i, ox * wave, oy * wave, oz * wave);
      }
      posAttr.needsUpdate = true;

      // Inner Light Pulse
      innerLight.intensity = 3.0 + Math.sin(elapsed * 3) * 1.5;

      // Hero Sphere Shatter & Expansion
      const heroFactor = Math.min(currentProgress / 0.16, 1.0);
      heroGroup.rotation.y = elapsed * 0.22 + mouse.x * 0.25;
      heroGroup.rotation.x = elapsed * 0.11 + mouse.y * 0.18;
      chromeGroup.rotation.z = -elapsed * 0.15;

      const shatterDist = 1.0 + heroFactor * 2.9;
      heroShards.forEach((s) => {
        s.mesh.position.set(
          s.origPos.x * shatterDist,
          s.origPos.y * shatterDist,
          s.origPos.z * shatterDist
        );
        s.mesh.rotation.x += s.rotSpeed.x;
        s.mesh.rotation.y += s.rotSpeed.y;
      });
      gyroRing1.rotation.z += 0.005;
      gyroRing2.rotation.x += 0.004;

      // About Architecture Dynamics
      archGroup.rotation.z = elapsed * 0.08;
      techNodes.forEach((node, i) => {
        const nodAngle = elapsed * 0.35 + (i / techNodes.length) * Math.PI * 2;
        const r = (isMobile ? 2.6 : 3.4) + Math.sin(elapsed * 2 + i) * 0.2;
        node.position.x = Math.cos(nodAngle) * r;
        node.position.y = Math.sin(nodAngle) * r;
        node.rotation.x += 0.02;
        node.rotation.y += 0.025;
      });

      // HandDance 3D Dynamics
      handGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.2 + mouse.x * 0.35;
      handGroup.rotation.x = mouse.y * 0.18;
      handNodes.forEach((node, i) => {
        node.position.y = landmarkPositions[i].y + Math.sin(elapsed * 3 + i) * 0.035;
      });

      // Retail Scanner Dynamics
      retailGroup.rotation.y = mouse.x * 0.18;
      laserPlane.position.y = Math.sin(elapsed * 2.2) * 1.5;

      // SaaS Panels Dynamics
      saasGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.12;
      slab1.position.y = Math.sin(elapsed * 1.1) * 0.08;
      slab2.position.y = Math.cos(elapsed * 1.1) * 0.08;

      // VoiceForge Waveform Dynamics
      const waveAttr = waveGeom.getAttribute('position') as THREE.BufferAttribute;
      const waveArr = waveAttr.array as Float32Array;
      for (let i = 0; i < wavePointsCount; i++) {
        const freq = Math.sin(i * 0.22 + elapsed * 5) * Math.cos(elapsed * 2.2) * 1.2;
        waveArr[i * 3 + 1] = freq;
      }
      waveAttr.needsUpdate = true;
      waveLine2.rotation.z = Math.PI;
      waveLine2.position.y = -0.15;
      audioParticles.rotation.y = elapsed * 0.12;

      // Security Hex Portal Dynamics
      hexRing.rotation.z = elapsed * 0.18;
      innerHex.rotation.z = -elapsed * 0.25;
      browser1.rotation.y = 0.32 + Math.sin(elapsed) * 0.04;
      browser2.rotation.y = -0.32 - Math.sin(elapsed) * 0.04;

      // Ending Visual Loop Dynamics
      const contactRatio = Math.max(0, (currentProgress - 0.82) / 0.18);
      loopGroup.rotation.y = elapsed * 0.25;
      loopGroup.rotation.x = elapsed * 0.12;

      const gatherFactor = 1.0 + (1.0 - contactRatio) * 3.8;
      loopShards.forEach((s) => {
        s.mesh.position.set(
          s.origPos.x * gatherFactor,
          s.origPos.y * gatherFactor,
          s.origPos.z * gatherFactor
        );
      });

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateResponsiveCamera);
      renderer.dispose();
      pmremGenerator.dispose();
      roomEnv.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
