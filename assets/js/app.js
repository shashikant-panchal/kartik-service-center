/**
 * Kartik Service Centre - WebGL 3D Suite & Interactive Workshop Engine
 * Features:
 * - Floating 3D Tools Engine: Real Metal Workshop Tools (Hathoda, Pakkad, Pana, Ring Pana, Pechkas, T-Pana, Salai Pana, Goti Ratchet, Chheni, L-Key, Nose Pakkad, Reti, Spark Plug, Nut-Boltu, Goli Bearing)
 * - Mobile View Fix: Dynamically brings tools in from the sides (responsive bounds) to prevent clipping
 * - Ultra-Realistic 3D Machinery Models (Metro Super Compressor, Triplex Washer, Air Gun, Drill, Grinder, Charger)
 * - Fixed Fullscreen 3D Modal: Immediate model swap & persistent active 3D rotation
 * - Horizontal Work Carousel with Left/Right Scroll and "View All" Grid Toggle
 */

// ============================================================================
// 1. FLOATING 3D TOOLS ENGINE (AUTHENTIC REAL METAL WORKSHOP TOOLS)
// ============================================================================
class FloatingTools3DEngine {
  constructor() {
    this.canvas = document.getElementById('floating-tools-canvas');
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.tools = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollY = 0;

    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    const isMobile = window.innerWidth < 640;
    this.camera = new THREE.PerspectiveCamera(isMobile ? 50 : 45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, isMobile ? 19 : 18);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // Rich Metallic Multi-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(12, 16, 14);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    rimLight.position.set(-14, -10, 8);
    this.scene.add(rimLight);

    const warmLight = new THREE.DirectionalLight(0xfef3c7, 0.6);
    warmLight.position.set(0, -15, -6);
    this.scene.add(warmLight);

    // Real Metal PBR Materials
    this.materials = {
      polishedChrome: new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        metalness: 0.98,
        roughness: 0.12
      }),
      forgedSteel: new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.92,
        roughness: 0.25
      }),
      castIron: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.88,
        roughness: 0.38
      }),
      solidBrass: new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.92,
        roughness: 0.18
      }),
      hardWood: new THREE.MeshStandardMaterial({
        color: 0x92400e,
        roughness: 0.55,
        metalness: 0.05
      }),
      amberResin: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.22,
        metalness: 0.2
      }),
      workshopGrip: new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        roughness: 0.65,
        metalness: 0.12
      }),
      darkRubber: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.85,
        metalness: 0.1
      }),
      ceramicWhite: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.15,
        metalness: 0.1
      })
    };

    this.createAllRealMetalTools();
    this.updateToolPositions();

    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY || window.pageYOffset;
    }, { passive: true });

    this.clock = new THREE.Clock();
    this.animate();
  }

  // -------------------------------------------------------------
  // Real Metal Workshop Tool Builders (Authentic Indian Garage DNA)
  // -------------------------------------------------------------

  // 1. Hathoda (Forged Steel Ball-Peen Hammer)
  createHathoda() {
    const group = new THREE.Group();
    // Forged steel hammer head
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.65, 16), this.materials.forgedSteel);
    head.rotation.z = Math.PI / 2;
    head.position.y = 0.45;
    group.add(head);

    // Polished striking face
    const face = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.12, 16), this.materials.polishedChrome);
    face.rotation.z = Math.PI / 2;
    face.position.set(0.35, 0.45, 0);
    group.add(face);

    // Ball peen (spherical back peen)
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 14), this.materials.polishedChrome);
    ball.position.set(-0.35, 0.45, 0);
    group.add(ball);

    // Wooden handle with wedge
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 1.45, 14), this.materials.hardWood);
    handle.position.y = -0.35;
    group.add(handle);

    return group;
  }

  // 2. Pakkad (Heavy Workshop Combination Pliers)
  createPakkad() {
    const group = new THREE.Group();
    // Central forged pivot rivet
    const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16), this.materials.forgedSteel);
    pivot.rotation.x = Math.PI / 2;
    group.add(pivot);

    // Forged serrated jaws
    const jawL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.09), this.materials.polishedChrome);
    jawL.position.set(-0.08, 0.34, 0);
    jawL.rotation.z = 0.14;
    group.add(jawL);

    const jawR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.09), this.materials.polishedChrome);
    jawR.position.set(0.08, 0.34, 0);
    jawR.rotation.z = -0.14;
    group.add(jawR);

    // Steel handles with blue workshop insulation sleeves
    const handleL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.95, 12), this.materials.workshopGrip);
    handleL.position.set(-0.24, -0.55, 0);
    handleL.rotation.z = -0.25;
    group.add(handleL);

    const handleR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.95, 12), this.materials.workshopGrip);
    handleR.position.set(0.24, -0.55, 0);
    handleR.rotation.z = 0.25;
    group.add(handleR);

    return group;
  }

  // 3. Double Open-End Pana (D-Pana / Double Spanner)
  createDoublePana() {
    const group = new THREE.Group();
    // Beam with recessed stamped channel
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.6, 0.08), this.materials.polishedChrome);
    group.add(beam);
    const channel = new THREE.Mesh(new THREE.BoxGeometry(0.11, 1.25, 0.085), this.materials.forgedSteel);
    group.add(channel);

    // 14mm Head (Top)
    const head1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.09, 16), this.materials.polishedChrome);
    head1.rotation.x = Math.PI / 2;
    head1.position.y = 0.88;
    const notch1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.12), this.materials.forgedSteel);
    notch1.position.set(0.06, 0.94, 0);
    notch1.rotation.z = Math.PI / 8;
    head1.add(notch1);
    group.add(head1);

    // 12mm Head (Bottom)
    const head2 = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.09, 16), this.materials.polishedChrome);
    head2.rotation.x = Math.PI / 2;
    head2.position.y = -0.88;
    const notch2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.26, 0.12), this.materials.forgedSteel);
    notch2.position.set(-0.05, -0.92, 0);
    notch2.rotation.z = -Math.PI / 8;
    head2.add(notch2);
    group.add(head2);

    return group;
  }

  // 4. Ring Pana (Combination Box-End Spanner)
  createRingPana() {
    const group = new THREE.Group();
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.19, 1.55, 0.075), this.materials.polishedChrome);
    group.add(beam);

    // 12-Point Ring Head (Top)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.085, 10, 24), this.materials.polishedChrome);
    ring.position.y = 0.9;
    group.add(ring);

    // Open Jaw (Bottom)
    const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.085, 16), this.materials.polishedChrome);
    jaw.rotation.x = Math.PI / 2;
    jaw.position.y = -0.88;
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, 0.1), this.materials.forgedSteel);
    slot.position.set(0.06, -0.94, 0);
    jaw.add(slot);
    group.add(jaw);

    return group;
  }

  // 5. Pechkas (Heavy-Duty Workshop Screwdriver with Bolster)
  createPechkas() {
    const group = new THREE.Group();
    // Heavy fluted handle
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.85, 12), this.materials.amberResin);
    handle.position.y = -0.45;
    group.add(handle);

    for (let i = 0; i < 4; i++) {
      const flute = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.65, 0.44), this.materials.darkRubber);
      flute.rotation.y = (i * Math.PI) / 4;
      flute.position.y = -0.45;
      group.add(flute);
    }

    // Steel hex bolster (for gripping with a pana)
    const bolster = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 6), this.materials.forgedSteel);
    bolster.position.y = 0.05;
    group.add(bolster);

    // Hexagonal chrome shank
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.05, 6), this.materials.polishedChrome);
    shank.position.y = 0.55;
    group.add(shank);

    // Hardened magnetic black oxide tip
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, 0.025), this.materials.castIron);
    tip.position.y = 1.1;
    group.add(tip);

    return group;
  }

  // 6. T-Pana (T-Handle Socket Wrench - Essential Two-Wheeler Garage Tool)
  createTPana() {
    const group = new THREE.Group();
    // Cross T-handle bar
    const crossBar = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.95, 14), this.materials.polishedChrome);
    crossBar.rotation.z = Math.PI / 2;
    crossBar.position.y = 0.85;
    group.add(crossBar);

    // Long vertical drive shaft
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.6, 14), this.materials.polishedChrome);
    shaft.position.y = 0.05;
    group.add(shaft);

    // 10mm Deep Hex Socket welded at bottom
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.38, 16), this.materials.forgedSteel);
    socket.position.y = -0.85;
    group.add(socket);

    const socketHole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.12, 6), this.materials.castIron);
    socketHole.position.y = -1.02;
    group.add(socketHole);

    return group;
  }

  // 7. Salai Pana (Adjustable Spanner / Crescent Wrench)
  createSalaiPana() {
    const group = new THREE.Group();
    // Heavy forged beam
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.5, 0.08), this.materials.polishedChrome);
    group.add(beam);

    // Hang hole at base
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.09, 12), this.materials.castIron);
    hole.rotation.x = Math.PI / 2;
    hole.position.y = -0.65;
    group.add(hole);

    // Fixed jaw head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.09), this.materials.polishedChrome);
    head.position.set(0.08, 0.85, 0);
    head.rotation.z = 0.22;
    group.add(head);

    // Brass thumb adjustment worm screw
    const worm = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.22, 14), this.materials.solidBrass);
    worm.position.set(-0.02, 0.72, 0);
    group.add(worm);

    return group;
  }

  // 8. Goti & Ratchet (Quick-Release Ratchet with Socket)
  createGotiRatchet() {
    const group = new THREE.Group();
    // Knurled chrome handle
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 1.35, 16), this.materials.polishedChrome);
    handle.position.y = -0.55;
    group.add(handle);

    const knurl = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.75, 16), this.materials.forgedSteel);
    knurl.position.y = -0.65;
    group.add(knurl);

    // Ratchet Head
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.18, 18), this.materials.polishedChrome);
    head.rotation.x = Math.PI / 2;
    head.position.y = 0.22;
    group.add(head);

    // Direction thumb lever
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.06), this.materials.castIron);
    lever.position.set(0, 0.22, 0.14);
    group.add(lever);

    // Deep Chrome Socket (Goti)
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 18), this.materials.polishedChrome);
    socket.position.set(0, 0.22, -0.32);
    group.add(socket);

    return group;
  }

  // 9. Chheni (Forged Octagonal Cold Chisel)
  createChheni() {
    const group = new THREE.Group();
    // Octagonal steel body
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.3, 8), this.materials.forgedSteel);
    group.add(shank);

    // Mushroomed striking cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.15, 8), this.materials.castIron);
    cap.position.y = 0.7;
    group.add(cap);

    // Hardened ground cutting wedge
    const wedge = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.03), this.materials.polishedChrome);
    wedge.position.y = -0.72;
    group.add(wedge);

    return group;
  }

  // 10. L-Key (Hardened Hex Allen Key)
  createLKey() {
    const group = new THREE.Group();
    // Long leg
    const longLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.4, 6), this.materials.forgedSteel);
    longLeg.position.y = 0.15;
    group.add(longLeg);

    // Elbow
    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), this.materials.forgedSteel);
    elbow.position.set(0, -0.55, 0);
    group.add(elbow);

    // Short leg
    const shortLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.6, 6), this.materials.forgedSteel);
    shortLeg.rotation.z = Math.PI / 2;
    shortLeg.position.set(0.28, -0.55, 0);
    group.add(shortLeg);

    return group;
  }

  // 11. Chhoti Pakkad / Nose Plier (Needle-Nose Plier for Circlips & Springs)
  createNosePakkad() {
    const group = new THREE.Group();
    const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16), this.materials.forgedSteel);
    pivot.rotation.x = Math.PI / 2;
    group.add(pivot);

    // Long tapered jaws
    const jawL = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.75, 10), this.materials.polishedChrome);
    jawL.position.set(-0.04, 0.45, 0);
    jawL.rotation.z = -0.05;
    group.add(jawL);

    const jawR = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.75, 10), this.materials.polishedChrome);
    jawR.position.set(0.04, 0.45, 0);
    jawR.rotation.z = 0.05;
    group.add(jawR);

    // Handles with red dip grips
    const handleL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.85, 10), this.materials.workshopGrip);
    handleL.position.set(-0.2, -0.5, 0);
    handleL.rotation.z = -0.25;
    group.add(handleL);

    const handleR = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.85, 10), this.materials.workshopGrip);
    handleR.position.set(0.2, -0.5, 0);
    handleR.rotation.z = 0.25;
    group.add(handleR);

    return group;
  }

  // 12. Reti (High-Carbon Steel Metal File)
  createReti() {
    const group = new THREE.Group();
    // Flat steel file blade with cross-cut tooth texture
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.25, 0.05), this.materials.forgedSteel);
    blade.position.y = 0.35;
    group.add(blade);

    // Wooden file handle
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.65, 12), this.materials.hardWood);
    handle.position.y = -0.6;
    group.add(handle);

    // Brass handle ferrule ring
    const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 14), this.materials.solidBrass);
    ferrule.position.y = -0.28;
    group.add(ferrule);

    return group;
  }

  // 13. Spark Plug (Motorcycle Spark Plug)
  createSparkPlug() {
    const group = new THREE.Group();
    // Top brass terminal
    const terminal = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 10), this.materials.solidBrass);
    terminal.position.y = 0.9;
    group.add(terminal);

    // Ribbed ceramic insulator
    const ceramic = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.5, 14), this.materials.ceramicWhite);
    ceramic.position.y = 0.6;
    group.add(ceramic);

    for (let i = 0; i < 3; i++) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.02, 6, 14), this.materials.ceramicWhite);
      rib.rotation.x = Math.PI / 2;
      rib.position.y = 0.5 + (i * 0.1);
      group.add(rib);
    }

    // Hex metal seat
    const hexSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.22, 6), this.materials.polishedChrome);
    hexSeat.position.y = 0.25;
    group.add(hexSeat);

    // Threaded barrel
    const thread = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.45, 14), this.materials.castIron);
    thread.position.y = -0.08;
    group.add(thread);

    // Curved nickel ground electrode
    const electrode = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.03), this.materials.polishedChrome);
    electrode.position.set(0.1, -0.36, 0);
    group.add(electrode);

    const tipBend = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.03), this.materials.polishedChrome);
    tipBend.position.set(0.05, -0.42, 0);
    group.add(tipBend);

    return group;
  }

  // 14. Nut & Boltu Set (Polished Hex Bolt with Nut & Washer)
  createNutBoltu() {
    const group = new THREE.Group();
    // Hex bolt head
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 6), this.materials.polishedChrome);
    head.position.y = 0.55;
    group.add(head);

    // Steel shaft with threads
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.1, 16), this.materials.forgedSteel);
    group.add(shaft);

    // Threaded hex nut screwed on
    const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.22, 6), this.materials.polishedChrome);
    nut.position.y = -0.15;
    group.add(nut);

    // Steel washer
    const washer = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.04, 20), this.materials.polishedChrome);
    washer.position.y = 0.35;
    group.add(washer);

    return group;
  }

  // 15. Goli Bearing (Deep Groove Ball Bearing with Chrome Steel Balls)
  createGoliBearing() {
    const group = new THREE.Group();
    // Outer race ring
    const outerRing = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.18, 28), this.materials.polishedChrome);
    group.add(outerRing);

    // Center clearance cutout
    const outerHole = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.19, 28), this.materials.forgedSteel);
    group.add(outerHole);

    // Inner axle race ring
    const innerRing = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.18, 24), this.materials.polishedChrome);
    group.add(innerRing);

    const innerBore = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.2, 20), this.materials.castIron);
    group.add(innerBore);

    // 8 Chrome Steel Ball Bearings in Cage
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), this.materials.polishedChrome);
      ball.position.set(Math.cos(angle) * 0.33, 0, Math.sin(angle) * 0.33);
      group.add(ball);
    }

    return group;
  }

  // -------------------------------------------------------------
  // Spawn and position the 15 Real Metal Tools
  // -------------------------------------------------------------
  createAllRealMetalTools() {
    // Relative normalized coordinates: all strictly placed on side margins (|normX| >= 0.88)
    // 8 tools on Left margin, 7 tools on Right margin across full vertical height
    const toolDefinitions = [
      // LEFT SIDE TOOLS (y from +6.8 down to -7.0)
      { name: 'hathoda',     fn: () => this.createHathoda(),     scale: 1.15, normX: -0.93, y:  6.8, z: -3.0, rx: 0.3, ry: 0.4,  rz: 0.6 },
      { name: 'pechkas',     fn: () => this.createPechkas(),     scale: 1.15, normX: -0.90, y:  4.8, z: -3.8, rx: 0.4, ry: 0.6,  rz: 0.3 },
      { name: 'sparkPlug',   fn: () => this.createSparkPlug(),   scale: 1.25, normX: -0.95, y:  2.8, z: -4.5, rx: 0.4, ry: 0.4,  rz: -0.3 },
      { name: 'nosePakkad',  fn: () => this.createNosePakkad(),  scale: 1.1,  normX: -0.88, y:  0.8, z: -2.5, rx: 0.5, ry: 0.2,  rz: 0.3 },
      { name: 'doublePana',  fn: () => this.createDoublePana(),  scale: 1.15, normX: -0.94, y: -1.2, z: -2.0, rx: 0.5, ry: 0.3,  rz: 0.7 },
      { name: 'salaiPana',   fn: () => this.createSalaiPana(),   scale: 1.05, normX: -0.89, y: -3.2, z: -3.2, rx: 0.2, ry: 0.7,  rz: 0.5 },
      { name: 'chheni',      fn: () => this.createChheni(),      scale: 1.15, normX: -0.95, y: -5.2, z: -3.6, rx: 0.2, ry: 0.4,  rz: 0.4 },
      { name: 'goliBearing', fn: () => this.createGoliBearing(), scale: 1.2,  normX: -0.91, y: -7.0, z: -4.0, rx: 0.3, ry: 0.3,  rz: 0.2 },

      // RIGHT SIDE TOOLS (y from +6.6 down to -5.6)
      { name: 'tPana',       fn: () => this.createTPana(),       scale: 1.1,  normX:  0.91, y:  6.6, z: -3.8, rx: 0.6, ry: 0.3,  rz: -0.2 },
      { name: 'pakkad',      fn: () => this.createPakkad(),      scale: 1.1,  normX:  0.95, y:  4.6, z: -2.8, rx: 0.2, ry: 0.2,  rz: -0.5 },
      { name: 'nutBoltu',    fn: () => this.createNutBoltu(),    scale: 1.15, normX:  0.89, y:  2.6, z: -4.2, rx: 0.6, ry: 0.2,  rz: 0.5 },
      { name: 'lKey',        fn: () => this.createLKey(),        scale: 1.25, normX:  0.94, y:  0.6, z: -3.2, rx: 0.3, ry: 0.6,  rz: -0.5 },
      { name: 'ringPana',    fn: () => this.createRingPana(),    scale: 1.1,  normX:  0.88, y: -1.4, z: -2.0, rx: 0.3, ry: 0.5,  rz: -0.4 },
      { name: 'gotiRatchet', fn: () => this.createGotiRatchet(), scale: 1.1,  normX:  0.95, y: -3.4, z: -2.5, rx: 0.4, ry: 0.3,  rz: -0.6 },
      { name: 'reti',        fn: () => this.createReti(),        scale: 1.15, normX:  0.92, y: -5.6, z: -3.5, rx: 0.3, ry: 0.5,  rz: 0.8 }
    ];

    toolDefinitions.forEach((def, index) => {
      const mesh = def.fn();
      this.scene.add(mesh);

      this.tools.push({
        mesh,
        normX: def.normX,
        baseY: def.y,
        baseZ: def.z,
        baseScale: def.scale,
        rotSpeedX: 0.003 + (index % 4) * 0.0012,
        rotSpeedY: 0.004 + (index % 3) * 0.0015,
        rotSpeedZ: 0.002 + (index % 5) * 0.001,
        floatFreq: 0.75 + (index % 4) * 0.2,
        floatAmp: 0.22 + (index % 3) * 0.06,
        phase: index * 0.75
      });
    });
  }

  // -------------------------------------------------------------
  // Responsive Outward Positioning (Side Margins)
  // -------------------------------------------------------------
  updateToolPositions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    if (this.camera) {
      this.camera.fov = isMobile ? 48 : 45;
      this.camera.position.z = isMobile ? 18.5 : 18;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
    if (this.renderer) {
      this.renderer.setSize(width, height);
    }

    // Dynamic visible half-width calculation at tool plane
    const cameraZ = this.camera ? this.camera.position.z : 18;
    const dist = cameraZ + 3.0;
    const fovRad = ((this.camera ? this.camera.fov : 45) * Math.PI) / 360;
    const visibleHalfHeight = dist * Math.tan(fovRad);
    const aspect = width / height;
    const visibleHalfWidth = visibleHalfHeight * aspect;

    // Outward positioning: keeps tools on the sides and outside the center content
    let maxSafeX;
    let scaleFactor;

    if (isMobile) {
      // Mobile: clamp outwards to 88% of visible edge, leaving center clear of tools
      maxSafeX = Math.min(visibleHalfWidth * 0.88, 4.0);
      scaleFactor = 0.65;
    } else if (isTablet) {
      maxSafeX = Math.min(visibleHalfWidth * 0.82, 7.8);
      scaleFactor = 0.82;
    } else {
      // Desktop: place in outer gutters flanking the 1200px container
      maxSafeX = Math.min(visibleHalfWidth * 0.78, 12.0);
      scaleFactor = 1.0;
    }

    this.tools.forEach((item) => {
      item.baseX = item.normX * maxSafeX;
      item.mesh.position.x = item.baseX;
      item.mesh.position.y = item.baseY;
      item.mesh.position.z = item.baseZ;
      item.mesh.scale.set(
        item.baseScale * scaleFactor,
        item.baseScale * scaleFactor,
        item.baseScale * scaleFactor
      );
    });
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  onResize() {
    this.updateToolPositions();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    this.mouseX += (this.targetMouseX - this.mouseX) * 0.04;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.04;

    this.camera.position.x = this.mouseX * 1.0;
    this.camera.position.y = -this.mouseY * 0.8;
    this.camera.lookAt(0, 0, 0);

    const scrollOffset = (this.scrollY * 0.0014);

    this.tools.forEach((item) => {
      const floatY = Math.sin(elapsedTime * item.floatFreq + item.phase) * item.floatAmp;
      item.mesh.position.y = item.baseY + floatY - (scrollOffset * (item.baseZ * -0.2));

      item.mesh.rotation.x += item.rotSpeedX;
      item.mesh.rotation.y += item.rotSpeedY;
      item.mesh.rotation.z += item.rotSpeedZ;
    });

    this.renderer.render(this.scene, this.camera);
  }
}

// ============================================================================
// 2. MACHINERY DATA DEFINITION
// ============================================================================
const MACHINERY_DATA = {
  compressor: {
    name: 'Metro Super Twin-Cylinder Air Compressor',
    category: 'Pneumatics & High-Pressure Air',
    tag: '5.0 HP • 200L High-Volume Receiver',
    specs: [
      { label: 'Operating Pressure', value: '140 PSI (9.6 BAR)' },
      { label: 'Air Displacement', value: '18.5 CFM' },
      { label: 'Cylinder Block', value: 'V-Twin Cast Iron with Deep Cooling Fins' },
      { label: 'Application', value: 'Impact Wrenches, Tire Inflation, High-Velocity Air Cleaning' }
    ],
    features: [
      'Industrial Metro Super twin-piston cast iron pump with precision needle bearings.',
      'Heavy-duty copper discharge manifold and calibrated safety relief valve.',
      'Continuous duty induction motor engineered for heavy daily workshop cycling.'
    ],
    maintenanceTip: 'Air intake filters inspected and reservoir moisture purged daily for clean pneumatic output.'
  },
  washer: {
    name: 'High-Pressure Triplex Car & Bike Washer',
    category: 'Hydro-Jet Deep Washing System',
    tag: '160 BAR • Brass Plunger Jet System',
    specs: [
      { label: 'Pressure Range', value: '130 - 160 BAR Continuous' },
      { label: 'Flow Rate', value: '12 Litres / Minute' },
      { label: 'Pump Manifold', value: 'Forged Solid Brass with Ceramic Plungers' },
      { label: 'Lance Type', value: 'Dual Vario-Jet Fan & Foam Cannon Quick-Lock' }
    ],
    features: [
      'Heavy forged brass manifold head resistant to mineral buildup and corrosive debris.',
      'High-velocity fan jet strips stubborn road grime, chain grease, and wheel grease in seconds.',
      'Adjustable pressure governor preserves delicate two-wheeler electrical harnesses and radiator fins.'
    ],
    maintenanceTip: 'Ceramic piston seals lubricated and in-line mesh sediment filter cleaned after every cycle.'
  },
  airgun: {
    name: 'Pneumatic Heavy-Duty Impact Air Gun',
    category: 'High-Torque Fastening Tool',
    tag: '1/2-Inch Drive • 850 Nm Twin Hammer',
    specs: [
      { label: 'Drive Size', value: '1/2" Square Drive' },
      { label: 'Peak Breakaway Torque', value: '850 Nm (627 ft-lbs)' },
      { label: 'Hammer Mechanism', value: 'Twin Hammer Balanced Impact Clutch' },
      { label: 'Free Speed', value: '8,500 RPM' }
    ],
    features: [
      'Twin hammer impact mechanism delivers instantaneous high-torque without chassis deflection.',
      'Hardened chrome-molybdenum anvil prevents shearing on seized motorcycle axle nuts.',
      'Feather-touch forward/reverse regulator with built-in silencer baffle.'
    ],
    maintenanceTip: 'Lubricated with synthetic pneumatic tool oil before every shift to keep the hammer clutch smooth.'
  },
  drill: {
    name: 'Heavy-Duty Electric Servicing Drill',
    category: 'Precision Drilling & Reaming',
    tag: '800W Motor • Variable Speed Reversible',
    specs: [
      { label: 'Rated Power', value: '800 Watts' },
      { label: 'Chuck Capacity', value: '13 mm Keyed Industrial Steel Chuck' },
      { label: 'No-Load Speed', value: '0 - 2,800 RPM' },
      { label: 'Torque Control', value: 'Infinitely Variable Trigger + Reverse Drive' }
    ],
    features: [
      'Robust metallic gear housing with all-ball-bearing construction for vibration-free drilling.',
      'Keyed chuck engineered for zero slippage during bolt extraction, stud drilling, and bracket fabrication.',
      '360-degree auxiliary stabilizing handle with integrated depth stop rod.'
    ],
    maintenanceTip: 'Chuck jaws periodically degreased and motor carbon brushes monitored every 150 hours.'
  },
  grinder: {
    name: 'High-Speed 4-Inch Angle Grinder',
    category: 'Metal Finishing, Cutting & Deburring',
    tag: '11,000 RPM • Spindle Lock Safety Guard',
    specs: [
      { label: 'Disc Diameter', value: '100 mm (4 Inch)' },
      { label: 'Operating Speed', value: '11,000 RPM' },
      { label: 'Motor Power', value: '750W Heavy Armature' },
      { label: 'Spindle Thread', value: 'M10 Hardened Alloy Steel' }
    ],
    features: [
      'Spiral bevel gears reduce vibration and maximize torque transmission during heavy cutting.',
      'Burst-proof adjustable steel wheel guard shields against sparks and abrasive fragments.',
      'Multi-axis side handle allows stable control for rust removal, welding cleanup, and exhaust fabrication.'
    ],
    maintenanceTip: 'Abrasive cutting discs checked for fractures before mounting; spindle lock inspected regularly.'
  },
  charger: {
    name: 'Rapid Multi-Stage Motorcycle Battery Charger',
    category: 'Electrical Diagnostic & Rapid Charger',
    tag: '12V Intelligent Pulse Desulfation',
    specs: [
      { label: 'Compatible Voltage', value: '12V Lead-Acid, AGM & Gel Batteries' },
      { label: 'Charging Modes', value: 'Pulse Repair, Rapid Charge & Float Trickle' },
      { label: 'Safety Protection', value: 'Reverse Polarity, Overcharge & Spark-Free Clamps' },
      { label: 'Display Panel', value: 'Backlit Digital LED Ammeter & Voltmeter' }
    ],
    features: [
      'Microprocessor-controlled 7-stage charging algorithm extends battery longevity.',
      'High-frequency pulse desulfation revives deeply drained motorcycle starter batteries.',
      'Heavy-duty copper terminal alligator clamps with heat-resistant insulated boots.'
    ],
    maintenanceTip: 'Terminal leads kept clean and dry; internal cooling fan cleared of dust for optimal heat dissipation.'
  }
};

// ============================================================================
// 3. REALISTIC PROCEDURAL 3D MODEL FACTORY
// ============================================================================
const RealisticModelFactory = {
  getMaterials() {
    return {
      darkSteel: new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.88, roughness: 0.28 }),
      chrome: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.96, roughness: 0.14 }),
      industrialRed: new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.55, roughness: 0.28 }),
      motorOrange: new THREE.MeshStandardMaterial({ color: 0xea580c, metalness: 0.45, roughness: 0.35 }),
      toolTeal: new THREE.MeshStandardMaterial({ color: 0x0f766e, metalness: 0.4, roughness: 0.38 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.88, roughness: 0.22 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, metalness: 0.08 }),
      glass: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08, transparent: true, opacity: 0.65 }),
      accentBlue: new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.5, roughness: 0.3 })
    };
  },

  // 1. Metro Super Compressor
  buildCompressor() {
    const group = new THREE.Group();
    const mat = this.getMaterials();

    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.5, 24), mat.industrialRed);
    tank.rotation.z = Math.PI / 2;
    group.add(tank);

    for (const pos of [-0.6, 0.6]) {
      const weld = new THREE.Mesh(new THREE.TorusGeometry(0.855, 0.015, 6, 24), mat.darkSteel);
      weld.rotation.y = Math.PI / 2;
      weld.position.x = pos;
      group.add(weld);
    }

    const capGeo = new THREE.SphereGeometry(0.85, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const leftCap = new THREE.Mesh(capGeo, mat.industrialRed);
    leftCap.rotation.z = Math.PI / 2;
    leftCap.position.x = -1.25;
    group.add(leftCap);

    const rightCap = new THREE.Mesh(capGeo, mat.industrialRed);
    rightCap.rotation.z = -Math.PI / 2;
    rightCap.position.x = 1.25;
    group.add(rightCap);

    for (const x of [-0.85, 0.85]) {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 1.2), mat.darkSteel);
      foot.position.set(x, -0.92, 0);
      group.add(foot);
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 1.22), mat.rubber);
      pad.position.set(x, -1.16, 0);
      group.add(pad);
    }

    const platform = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.12, 0.95), mat.darkSteel);
    platform.position.set(0, 0.95, 0);
    group.add(platform);

    const vGroup = new THREE.Group();
    vGroup.position.set(-0.35, 1.35, 0);

    const crankcase = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.5, 0.6), mat.darkSteel);
    vGroup.add(crankcase);

    for (const angle of [-0.38, 0.38]) {
      const cyl = new THREE.Group();
      cyl.rotation.z = angle;
      cyl.position.set(angle * 0.45, 0.35, 0);

      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.6, 16), mat.darkSteel);
      cyl.add(barrel);

      for (let f = -0.22; f <= 0.22; f += 0.08) {
        const fin = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 16), mat.chrome);
        fin.position.y = f;
        cyl.add(fin);
      }

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.16, 0.52), mat.chrome);
      head.position.y = 0.36;
      cyl.add(head);

      const filter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.16, 14), mat.rubber);
      filter.position.set(0, 0.52, 0.18);
      cyl.add(filter);

      vGroup.add(cyl);
    }
    group.add(vGroup);

    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.95, 18), mat.accentBlue);
    motor.rotation.z = Math.PI / 2;
    motor.position.set(0.55, 1.45, 0);
    group.add(motor);

    const flywheel = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.06, 10, 24), mat.darkSteel);
    flywheel.position.set(-0.35, 1.35, 0.4);
    group.add(flywheel);

    for (const z of [0.4, 0.6]) {
      const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.06, 16), mat.chrome);
      gauge.rotation.x = Math.PI / 2;
      gauge.position.set(0.15, 1.35, z);
      group.add(gauge);
    }

    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.1, 0.015), mat.industrialRed);
    needle.position.set(0.15, 1.35, 0.44);
    needle.rotation.z = -0.5;
    group.add(needle);
    group.needle = needle;

    return group;
  },

  // 2. High-Pressure Triplex Washer
  buildWasher() {
    const group = new THREE.Group();
    const mat = this.getMaterials();

    const frameGeo = new THREE.TorusGeometry(1.2, 0.07, 10, 24, Math.PI);
    const handleFrame = new THREE.Mesh(frameGeo, mat.chrome);
    handleFrame.rotation.x = -Math.PI / 2;
    handleFrame.position.set(0, 1.0, -0.4);
    group.add(handleFrame);

    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 1.2), mat.darkSteel);
    group.add(basePlate);

    for (const z of [-0.65, 0.65]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.18, 18), mat.rubber);
      wheel.position.set(-0.45, 0, z);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.2, 12), mat.chrome);
      hub.position.set(-0.45, 0, z);
      group.add(wheel);
      group.add(hub);
    }

    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.0, 18), mat.accentBlue);
    motor.rotation.z = Math.PI / 2;
    motor.position.set(-0.1, 0.5, 0);
    group.add(motor);

    const brassManifold = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.8), mat.brass);
    brassManifold.position.set(0.65, 0.45, 0);
    group.add(brassManifold);

    for (const z of [-0.25, 0, 0.25]) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), mat.chrome);
      cap.position.set(0.65, 0.72, z);
      group.add(cap);
    }

    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.18, 14), mat.industrialRed);
    dial.position.set(0.8, 0.75, -0.2);
    group.add(dial);

    const lance = new THREE.Group();
    lance.position.set(0.4, 0.9, 0.5);
    lance.rotation.x = 0.2;
    lance.rotation.y = 0.3;

    const lanceHandle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.15), mat.rubber);
    lance.add(lanceHandle);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 10), mat.chrome);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.7, 0.15, 0);
    lance.add(barrel);

    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.15, 10), mat.brass);
    nozzle.rotation.z = Math.PI / 2;
    nozzle.position.set(1.45, 0.15, 0);
    lance.add(nozzle);

    group.add(lance);
    return group;
  },

  // 3. Pneumatic Air Gun
  buildAirGun() {
    const group = new THREE.Group();
    const mat = this.getMaterials();

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 1.3, 16), mat.darkSteel);
    handle.rotation.z = 0.2;
    handle.position.set(-0.25, -0.3, 0);
    group.add(handle);

    for (let i = -0.4; i <= 0.2; i += 0.2) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.03, 8, 16), mat.rubber);
      rib.position.set(-0.25 - (i * 0.2), i, 0);
      group.add(rib);
    }

    const nipple = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 12), mat.brass);
    nipple.position.set(-0.4, -1.05, 0);
    group.add(nipple);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.3, 20), mat.chrome);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(0.15, 0.5, 0);
    group.add(barrel);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.6, 20), mat.darkSteel);
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(0.95, 0.5, 0);
    group.add(nose);

    const anvil = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.22), mat.chrome);
    anvil.position.set(1.35, 0.5, 0);
    group.add(anvil);

    const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.12), mat.industrialRed);
    trigger.position.set(0.05, 0.1, 0);
    group.add(trigger);

    return group;
  },

  // 4. Electric Servicing Drill
  buildDrill() {
    const group = new THREE.Group();
    const mat = this.getMaterials();

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.4, 1.25, 18), mat.toolTeal);
    body.rotation.z = Math.PI / 2;
    body.position.set(0.1, 0.45, 0);
    group.add(body);

    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.35), mat.toolTeal);
    handle.rotation.z = 0.15;
    handle.position.set(-0.25, -0.25, 0);
    group.add(handle);

    const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.14), mat.motorOrange);
    trigger.position.set(-0.06, 0.05, 0);
    group.add(trigger);

    const gearHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.42, 0.5, 18), mat.chrome);
    gearHousing.rotation.z = Math.PI / 2;
    gearHousing.position.set(0.85, 0.45, 0);
    group.add(gearHousing);

    const chuck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.45, 16), mat.darkSteel);
    chuck.rotation.z = Math.PI / 2;
    chuck.position.set(1.25, 0.45, 0);
    group.add(chuck);

    const bit = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12), mat.chrome);
    bit.rotation.z = Math.PI / 2;
    bit.position.set(1.75, 0.45, 0);
    group.add(bit);
    group.bit = bit;

    const sideGrip = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.85, 12), mat.darkSteel);
    sideGrip.position.set(0.8, 1.0, 0);
    group.add(sideGrip);

    return group;
  },

  // 5. Angle Grinder
  buildGrinder() {
    const group = new THREE.Group();
    const mat = this.getMaterials();

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.3, 1.7, 18), mat.toolTeal);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(-0.25, 0, 0);
    group.add(barrel);

    const gearHead = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 0.65), mat.chrome);
    gearHead.position.set(0.8, 0, 0);
    group.add(gearHead);

    const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.12, 24, 1, false, 0, Math.PI), mat.darkSteel);
    guard.rotation.x = Math.PI / 2;
    guard.position.set(0.8, -0.3, 0);
    group.add(guard);

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.03, 32), mat.rubber);
    disc.position.set(0.8, -0.32, 0);
    group.add(disc);
    group.disc = disc;

    const sideHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.75, 12), mat.rubber);
    sideHandle.rotation.x = Math.PI / 2;
    sideHandle.position.set(0.8, 0, 0.65);
    group.add(sideHandle);

    return group;
  },

  // 6. Rapid Multi-Stage Battery Charger (Ultra-Realistic Workshop Model)
  buildCharger() {
    const group = new THREE.Group();
    const mat = this.getMaterials();

    // Extra dedicated materials for realism
    const copper = new THREE.MeshStandardMaterial({ color: 0xc27803, metalness: 0.92, roughness: 0.22 });
    const dialFace = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.05 });
    const lcdScreen = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.5, roughness: 0.2 });
    const ledGreen = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x16a34a, emissiveIntensity: 0.8 });
    const ledYellow = new THREE.MeshStandardMaterial({ color: 0xeab308, emissive: 0xca8a04, emissiveIntensity: 0.8 });
    const ledRed = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.8 });
    const ledBlue = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x2563eb, emissiveIntensity: 0.8 });
    const needleMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
    const rockerRed = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35, metalness: 0.2 });
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.28 });
    const faceplateMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.4 });

    // 1. Main Steel Chassis Enclosure
    const mainBox = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.05, 1.2), chassisMat);
    mainBox.position.set(0, 0, 0);
    group.add(mainBox);

    // Beveled top hood visor
    const topVisor = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.12, 1.25), mat.darkSteel);
    topVisor.position.set(0, 0.54, 0.02);
    group.add(topVisor);

    // 4 Corner Rubber Bumpers & Foot Pads
    for (const [cx, cz] of [[-0.85, -0.6], [-0.85, 0.6], [0.85, -0.6], [0.85, 0.6]]) {
      const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.12, 0.08), mat.rubber);
      bumper.position.set(cx, 0, cz);
      group.add(bumper);

      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 12), mat.rubber);
      foot.position.set(cx * 0.9, -0.56, cz * 0.9);
      group.add(foot);
    }

    // Heavy-duty top carrying handle
    for (const hx of [-0.42, 0.42]) {
      const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.24, 12), mat.chrome);
      bracket.position.set(hx, 0.68, 0);
      group.add(bracket);
    }
    const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.96, 16), mat.rubber);
    handleBar.rotation.z = Math.PI / 2;
    handleBar.position.set(0, 0.78, 0);
    group.add(handleBar);

    // Side Cooling Ventilation Louvers
    for (const sideX of [-0.855, 0.855]) {
      for (let ly = -0.25; ly <= 0.25; ly += 0.1) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.035, 0.65), mat.darkSteel);
        louver.position.set(sideX, ly, 0);
        group.add(louver);
      }
    }

    // 2. Front Control Console Fascia
    const faceplate = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.92, 0.04), faceplateMat);
    faceplate.position.set(0, 0, 0.61);
    group.add(faceplate);

    // Dual Analog Dial Meters (Ammeter left, Voltmeter right)
    const meterPositions = [
      { x: -0.44, y: 0.18, rot: 0.4 },
      { x:  0.44, y: 0.18, rot: -0.3 }
    ];

    meterPositions.forEach(m => {
      // Chrome bezel ring
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24), mat.chrome);
      bezel.rotation.x = Math.PI / 2;
      bezel.position.set(m.x, m.y, 0.63);
      group.add(bezel);

      // Dial face
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.045, 24), dialFace);
      dial.rotation.x = Math.PI / 2;
      dial.position.set(m.x, m.y, 0.635);
      group.add(dial);

      // Needle pivot center cap
      const centerPin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 12), mat.darkSteel);
      centerPin.rotation.x = Math.PI / 2;
      centerPin.position.set(m.x, m.y - 0.04, 0.64);
      group.add(centerPin);

      // Needle pointer
      const needle = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.14, 0.008), needleMat);
      needle.position.set(m.x + Math.sin(m.rot) * 0.06, m.y - 0.04 + Math.cos(m.rot) * 0.06, 0.645);
      needle.rotation.z = -m.rot;
      group.add(needle);

      // Glass lens
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.015, 24), mat.glass);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(m.x, m.y, 0.655);
      group.add(lens);
    });

    // Central Digital LCD Telemetry Screen
    const lcdFrame = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.04), mat.darkSteel);
    lcdFrame.position.set(0, 0.22, 0.63);
    group.add(lcdFrame);

    const lcdDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.18, 0.045), lcdScreen);
    lcdDisplay.position.set(0, 0.22, 0.635);
    group.add(lcdDisplay);

    const lcdGlass = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.2, 0.01), mat.glass);
    lcdGlass.position.set(0, 0.22, 0.65);
    group.add(lcdGlass);

    // 4 Diagnostic Status LEDs in horizontal row
    const leds = [
      { x: -0.22, mat: ledGreen },   // Power
      { x: -0.07, mat: ledYellow },  // Charging
      { x:  0.07, mat: ledRed },     // Polarity Error
      { x:  0.22, mat: ledBlue }      // Float Full
    ];
    leds.forEach(l => {
      const ledRing = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.03, 12), mat.chrome);
      ledRing.rotation.x = Math.PI / 2;
      ledRing.position.set(l.x, 0.04, 0.63);
      group.add(ledRing);

      const ledBulb = new THREE.Mesh(new THREE.SphereGeometry(0.024, 12, 12), l.mat);
      ledBulb.position.set(l.x, 0.04, 0.645);
      group.add(ledBulb);
    });

    // Rotary Rate & Voltage Knobs
    for (const [kx, angle] of [[-0.42, 0.5], [0.42, -0.6]]) {
      const knobBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.07, 16), mat.rubber);
      knobBase.rotation.x = Math.PI / 2;
      knobBase.position.set(kx, -0.15, 0.64);
      group.add(knobBase);

      const knobFace = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16), mat.chrome);
      knobFace.rotation.x = Math.PI / 2;
      knobFace.position.set(kx, -0.15, 0.655);
      group.add(knobFace);

      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.02), needleMat);
      notch.position.set(kx + Math.sin(angle) * 0.05, -0.15 + Math.cos(angle) * 0.05, 0.68);
      notch.rotation.z = -angle;
      group.add(notch);
    }

    // Heavy Rocker Power Switch (Center Lower)
    const switchBezel = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.03), mat.rubber);
    switchBezel.position.set(0, -0.15, 0.63);
    group.add(switchBezel);

    const switchRocker = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.04), rockerRed);
    switchRocker.position.set(0, -0.15, 0.645);
    switchRocker.rotation.x = 0.2;
    group.add(switchRocker);

    // 3. Heavy Brass Terminal Binding Posts (Red + and Black -)
    const terminals = [
      { x: -0.32, mat: mat.industrialRed },
      { x:  0.32, mat: mat.rubber }
    ];

    terminals.forEach(t => {
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 6), t.mat);
      collar.rotation.x = Math.PI / 2;
      collar.position.set(t.x, -0.34, 0.64);
      group.add(collar);

      const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 16), mat.brass);
      stud.rotation.x = Math.PI / 2;
      stud.position.set(t.x, -0.34, 0.68);
      group.add(stud);

      const grommet = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.09, 12), mat.rubber);
      grommet.rotation.x = Math.PI / 2;
      grommet.position.set(t.x, -0.34, 0.74);
      group.add(grommet);
    });

    // 4. Heavy-Duty Flexible DC Output Cables
    const redCableCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.32, -0.34, 0.76),
      new THREE.Vector3(-0.8, -0.65, 1.25),
      new THREE.Vector3(-0.75, -0.45, 1.6)
    );
    const redCableGeo = new THREE.TubeGeometry(redCableCurve, 20, 0.042, 8, false);
    const redCableMesh = new THREE.Mesh(redCableGeo, mat.industrialRed);
    group.add(redCableMesh);

    const blackCableCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.32, -0.34, 0.76),
      new THREE.Vector3(0.8, -0.65, 1.25),
      new THREE.Vector3(0.75, -0.45, 1.6)
    );
    const blackCableGeo = new THREE.TubeGeometry(blackCableCurve, 20, 0.042, 8, false);
    const blackCableMesh = new THREE.Mesh(blackCableGeo, mat.rubber);
    group.add(blackCableMesh);

    // 5. Authentic Heavy-Duty Alligator Clamps (Positive Red & Negative Black)
    const createClamp = (isRed, posX, posZ, rotY) => {
      const clampGroup = new THREE.Group();
      clampGroup.position.set(posX, -0.44, posZ);
      clampGroup.rotation.y = rotY;
      clampGroup.rotation.x = -0.15;

      const handleMat = isRed ? mat.industrialRed : mat.rubber;

      // Ergonomic Insulated Handle Sleeves
      const upperHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.45, 12), handleMat);
      upperHandle.rotation.z = 0.28;
      upperHandle.position.set(-0.08, 0.06, -0.18);
      clampGroup.add(upperHandle);

      const lowerHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.45, 12), handleMat);
      lowerHandle.rotation.z = -0.28;
      lowerHandle.position.set(0.08, 0.06, -0.18);
      clampGroup.add(lowerHandle);

      // Heavy Pivot Hinge Rivet & Tension Spring
      const pivotPin = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.18, 12), mat.chrome);
      pivotPin.rotation.x = Math.PI / 2;
      pivotPin.position.set(0, 0.08, 0.05);
      clampGroup.add(pivotPin);

      const spring = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.015, 6, 16), mat.darkSteel);
      spring.position.set(0, 0.08, 0.05);
      clampGroup.add(spring);

      // Solid Copper Jaw Blades with Serrated Teeth
      const upperJaw = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.035, 0.42), copper);
      upperJaw.position.set(-0.04, 0.1, 0.24);
      clampGroup.add(upperJaw);

      const lowerJaw = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.035, 0.42), copper);
      lowerJaw.position.set(0.04, 0.06, 0.24);
      clampGroup.add(lowerJaw);

      // Serrated copper teeth details on jaws
      for (let tz = 0.12; tz <= 0.38; tz += 0.065) {
        const toothU = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.025), copper);
        toothU.position.set(-0.04, 0.08, tz);
        clampGroup.add(toothU);

        const toothL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.025), copper);
        toothL.position.set(0.04, 0.08, tz);
        clampGroup.add(toothL);
      }

      return clampGroup;
    };

    const redClamp = createClamp(true, -0.75, 1.72, 0.25);
    group.add(redClamp);

    const blackClamp = createClamp(false, 0.75, 1.72, -0.25);
    group.add(blackClamp);

    // 6. Rear Panel: Circular Cooling Fan Exhaust Grille & AC Inlet
    const fanGrille = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.03, 24), mat.darkSteel);
    fanGrille.rotation.x = Math.PI / 2;
    fanGrille.position.set(0, 0, -0.61);
    group.add(fanGrille);

    const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16), mat.chrome);
    fanHub.rotation.x = Math.PI / 2;
    fanHub.position.set(0, 0, -0.615);
    group.add(fanHub);

    for (let fb = 0; fb < 4; fb++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.01), mat.rubber);
      blade.rotation.z = (fb * Math.PI) / 4;
      blade.position.set(0, 0, -0.615);
      group.add(blade);
    }

    return group;
  }
};

// ============================================================================
// 4. MACHINERY CARDS VIEWER
// ============================================================================
class MachineCardsViewer {
  constructor() {
    this.containers = document.querySelectorAll('.canvas-3d-container');
    this.viewers = [];
    this.init();
  }

  init() {
    if (!this.containers.length || typeof THREE === 'undefined') return;

    this.containers.forEach((container) => {
      const machineType = container.getAttribute('data-machine');
      const viewer = this.createViewer(container, machineType);
      if (viewer) this.viewers.push(viewer);
    });

    window.addEventListener('resize', () => {
      this.viewers.forEach(v => v.handleResize());
    });
  }

  createViewer(container, type) {
    const scene = new THREE.Scene();

    const isMobile = window.innerWidth < 640;
    const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.8, isMobile ? 5.2 : 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.7);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    let model;
    switch (type) {
      case 'compressor': model = RealisticModelFactory.buildCompressor(); break;
      case 'washer':     model = RealisticModelFactory.buildWasher(); break;
      case 'airgun':     model = RealisticModelFactory.buildAirGun(); break;
      case 'drill':      model = RealisticModelFactory.buildDrill(); break;
      case 'grinder':    model = RealisticModelFactory.buildGrinder(); break;
      case 'charger':    model = RealisticModelFactory.buildCharger(); break;
      default:           model = new THREE.Group();
    }
    scene.add(model);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0;
    let rotY = 0;

    const startDrag = (x, y) => { isDragging = true; prevX = x; prevY = y; };
    const moveDrag = (x, y) => {
      if (!isDragging) return;
      rotY += (x - prevX) * 0.01;
      rotX += (y - prevY) * 0.01;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));
      prevX = x;
      prevY = y;
    };
    const endDrag = () => { isDragging = false; };

    container.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);

    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', endDrag);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        rotY += delta * 0.35;
      }
      model.rotation.y = rotY;
      model.rotation.x = rotX;

      if (model.needle) {
        model.needle.rotation.z = -0.5 + Math.sin(clock.getElapsedTime() * 8) * 0.08;
      }

      renderer.render(scene, camera);
    };
    animate();

    return {
      handleResize: () => {
        const mob = window.innerWidth < 640;
        camera.fov = mob ? 50 : 45;
        camera.position.z = mob ? 5.2 : 4.4;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
  }
}

// ============================================================================
// 5. FULLSCREEN 3D INSPECTOR (BUG FIXED: INSTANT SWITCH & PERSISTENT ANIMATION)
// ============================================================================
class Fullscreen3DInspector {
  constructor() {
    this.modal = document.getElementById('inspection-modal');
    this.canvas = document.getElementById('modal-3d-canvas');
    this.closeButtons = document.querySelectorAll('.close-modal-btn');
    this.triggerButtons = document.querySelectorAll('.inspect-machine-btn');

    this.titleEl = document.getElementById('modal-machine-title');
    this.tagEl = document.getElementById('modal-machine-tag');
    this.specsEl = document.getElementById('modal-machine-specs');
    this.featuresEl = document.getElementById('modal-machine-features');
    this.tipEl = document.getElementById('modal-machine-tip');
    this.whatsappBtn = document.getElementById('modal-whatsapp-btn');

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentModel = null;
    this.currentType = null;
    this.isOpen = false;
    this.animId = null;
    this.zoomLevel = 4.2;
    this.isDragging = false;
    this.prevX = 0;
    this.prevY = 0;

    this.init();
  }

  init() {
    if (!this.modal || !this.canvas) return;

    this.triggerButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetBtn = btn.closest('[data-machine]');
        const type = targetBtn ? targetBtn.getAttribute('data-machine') : btn.getAttribute('data-machine');
        if (type) this.open(type);
      });
    });

    this.closeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    const zoomInBtn = document.getElementById('modal-zoom-in');
    const zoomOutBtn = document.getElementById('modal-zoom-out');
    const resetBtn = document.getElementById('modal-reset-view');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        this.zoomLevel = Math.max(2.5, this.zoomLevel - 0.6);
        if (this.camera) this.camera.position.z = this.zoomLevel;
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        this.zoomLevel = Math.min(6.5, this.zoomLevel + 0.6);
        if (this.camera) this.camera.position.z = this.zoomLevel;
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.zoomLevel = window.innerWidth < 640 ? 4.8 : 4.0;
        if (this.camera) this.camera.position.set(0, 0.8, this.zoomLevel);
        if (this.currentModel) this.currentModel.rotation.set(0.1, -0.3, 0);
      });
    }
  }

  setupThreeScene() {
    if (this.scene) return;

    this.scene = new THREE.Scene();
    const isMobile = window.innerWidth < 640;
    this.zoomLevel = isMobile ? 4.8 : 4.0;

    this.camera = new THREE.PerspectiveCamera(isMobile ? 50 : 45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 100);
    this.camera.position.set(0, 0.8, this.zoomLevel);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    const ambient = new THREE.AmbientLight(0xffffff, 0.95);
    this.scene.add(ambient);

    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dir1.position.set(6, 10, 8);
    this.scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xdbeafe, 0.6);
    dir2.position.set(-6, -4, 5);
    this.scene.add(dir2);

    const rim = new THREE.DirectionalLight(0xfef3c7, 0.5);
    rim.position.set(0, 6, -6);
    this.scene.add(rim);

    const start = (x, y) => { this.isDragging = true; this.prevX = x; this.prevY = y; };
    const move = (x, y) => {
      if (!this.isDragging || !this.currentModel) return;
      this.currentModel.rotation.y += (x - this.prevX) * 0.01;
      this.currentModel.rotation.x += (y - this.prevY) * 0.01;
      this.prevX = x;
      this.prevY = y;
    };
    const end = () => { this.isDragging = false; };

    this.canvas.addEventListener('mousedown', (e) => start(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
    window.addEventListener('mouseup', end);

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) start(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) move(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', end);
  }

  startAnimationLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);

    const renderFrame = () => {
      if (!this.isOpen) return;

      this.animId = requestAnimationFrame(renderFrame);

      if (this.currentModel && !this.isDragging) {
        this.currentModel.rotation.y += 0.006;
      }

      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };

    renderFrame();
  }

  loadModel(type) {
    if (!this.scene) return;

    if (this.currentModel) {
      this.scene.remove(this.currentModel);
      this.currentModel = null;
    }

    let model;
    switch (type) {
      case 'compressor': model = RealisticModelFactory.buildCompressor(); break;
      case 'washer':     model = RealisticModelFactory.buildWasher(); break;
      case 'airgun':     model = RealisticModelFactory.buildAirGun(); break;
      case 'drill':      model = RealisticModelFactory.buildDrill(); break;
      case 'grinder':    model = RealisticModelFactory.buildGrinder(); break;
      case 'charger':    model = RealisticModelFactory.buildCharger(); break;
      default:           model = new THREE.Group();
    }

    model.rotation.set(0.12, -0.35, 0);
    this.currentModel = model;
    this.scene.add(this.currentModel);

    if (this.renderer && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  open(type) {
    const data = MACHINERY_DATA[type];
    if (!data) return;

    this.currentType = type;
    this.isOpen = true;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (this.titleEl) this.titleEl.textContent = data.name;
    if (this.tagEl) this.tagEl.textContent = data.tag;

    if (this.specsEl) {
      this.specsEl.innerHTML = data.specs.map(s => `
        <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <span class="text-[11px] font-tech text-slate-500 uppercase block">${s.label}</span>
          <span class="text-xs sm:text-sm font-tech font-bold text-slate-800">${s.value}</span>
        </div>
      `).join('');
    }

    if (this.featuresEl) {
      this.featuresEl.innerHTML = data.features.map(f => `
        <li class="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-tech">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
          <span>${f}</span>
        </li>
      `).join('');
    }

    if (this.tipEl) this.tipEl.textContent = data.maintenanceTip;

    if (this.whatsappBtn) {
      this.whatsappBtn.href = `https://wa.me/916363176145?text=Hello%20Kartik,%20I%20have%20an%20inquiry%20regarding%20service%20using%20the%20${encodeURIComponent(data.name)}.`;
    }

    this.setupThreeScene();
    this.handleResize();
    this.loadModel(type);
    this.startAnimationLoop();
  }

  handleResize() {
    if (!this.renderer || !this.camera || !this.canvas) return;
    const isMobile = window.innerWidth < 640;
    this.camera.fov = isMobile ? 50 : 45;
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  close() {
    this.isOpen = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// 6. WORKSHOP GALLERY (HORIZONTAL CAROUSEL & "VIEW ALL" GRID TOGGLE)
// ============================================================================
class WorkshopGallery {
  constructor() {
    this.filterBtns = document.querySelectorAll('.gallery-filter-btn');
    this.cards = document.querySelectorAll('.gallery-card');
    this.track = document.getElementById('gallery-carousel-track');
    this.prevBtn = document.getElementById('carousel-prev-btn');
    this.nextBtn = document.getElementById('carousel-next-btn');
    this.viewModeToggleBtn = document.getElementById('gallery-view-mode-btn');

    this.lightbox = document.getElementById('gallery-lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxClose = document.querySelectorAll('.close-lightbox-btn');

    this.isGridView = false;
    this.init();
  }

  init() {
    if (!this.cards.length) return;

    if (this.prevBtn && this.track) {
      this.prevBtn.addEventListener('click', () => {
        this.track.scrollBy({ left: -340, behavior: 'smooth' });
      });
    }

    if (this.nextBtn && this.track) {
      this.nextBtn.addEventListener('click', () => {
        this.track.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    if (this.viewModeToggleBtn && this.track) {
      this.viewModeToggleBtn.addEventListener('click', () => {
        this.isGridView = !this.isGridView;
        if (this.isGridView) {
          this.track.classList.remove('flex', 'overflow-x-auto', 'snap-x', 'no-scrollbar');
          this.track.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4');
          this.viewModeToggleBtn.innerHTML = `
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
            <span>Switch to Carousel View</span>
          `;
          if (this.prevBtn) this.prevBtn.style.display = 'none';
          if (this.nextBtn) this.nextBtn.style.display = 'none';
        } else {
          this.track.classList.remove('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4');
          this.track.classList.add('flex', 'overflow-x-auto', 'snap-x', 'no-scrollbar');
          this.viewModeToggleBtn.innerHTML = `
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span>View All (16 Photos)</span>
          `;
          if (this.prevBtn) this.prevBtn.style.display = 'inline-flex';
          if (this.nextBtn) this.nextBtn.style.display = 'inline-flex';
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }

    this.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-blue-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
        });
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

        const cat = btn.getAttribute('data-filter');
        this.cards.forEach((card) => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    this.cards.forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.querySelector('h4');
        if (img && this.lightbox && this.lightboxImg) {
          this.lightboxImg.src = img.src;
          this.lightboxCaption.textContent = caption ? caption.textContent : 'Kartik Service Centre Live Action';
          this.lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    this.lightboxClose.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.lightbox.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox && this.lightbox.classList.contains('active')) {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ============================================================================
// 7. INITIALIZE ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-menu');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  new FloatingTools3DEngine();
  new MachineCardsViewer();
  new Fullscreen3DInspector();
  new WorkshopGallery();
});
