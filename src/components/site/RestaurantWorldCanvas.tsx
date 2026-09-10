import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface RestaurantCanvasHandle {
  flyToZone: (zoneIndex: number) => void;
}

interface RestaurantWorldCanvasProps {
  onZoneChange?: (zoneIndex: number) => void;
}

export const RestaurantWorldCanvas = forwardRef<RestaurantCanvasHandle, RestaurantWorldCanvasProps>(
  function RestaurantWorldCanvas({ onZoneChange }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
    const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
    const mousePosRef = useRef({ x: 0, y: 0 });
    const targetCameraPosRef = useRef(new THREE.Vector3(0, 1.6, 26));
    const isInteractingTourRef = useRef(false);

    // Waypoints along the continuous restaurant journey
    // Each waypoint corresponds to a zone (0 to 11)
    const WAYPOINTS = [
      // 0: Exterior Entrance (Hero)
      { cam: new THREE.Vector3(0, 1.6, 26), look: new THREE.Vector3(0, 1.5, 18), name: "Entrance" },
      // 1: Dining Sanctuary (Room 1)
      { cam: new THREE.Vector3(-1.2, 1.5, 12), look: new THREE.Vector3(0, 1.4, 4), name: "Dining Sanctuary" },
      // 2: Mandala Feature Wall (Room 2)
      { cam: new THREE.Vector3(2.5, 1.7, 0), look: new THREE.Vector3(0, 1.8, -4), name: "Mandala Wall" },
      // 3: Artisanal Coffee Lounge (Room 3)
      { cam: new THREE.Vector3(-2.8, 1.4, -14), look: new THREE.Vector3(-0.8, 1.3, -18), name: "Coffee Lounge" },
      // 4: Live Charcoal Tandoor (Room 4)
      { cam: new THREE.Vector3(1.8, 1.3, -28), look: new THREE.Vector3(0.5, 1.2, -34), name: "Live Tandoor" },
      // 5: Signature Food Showcase (Room 5)
      { cam: new THREE.Vector3(0, 1.6, -42), look: new THREE.Vector3(0, 1.5, -48), name: "Food Showcase" },
      // 6: 3D Interactive Menu Realm (Room 6)
      { cam: new THREE.Vector3(-1.5, 1.7, -56), look: new THREE.Vector3(0, 1.6, -62), name: "Menu Experience" },
      // 7: Signature Sips Mocktail (Room 7)
      { cam: new THREE.Vector3(2.2, 1.4, -70), look: new THREE.Vector3(0.6, 1.3, -76), name: "Mocktail Bar" },
      // 8: Al-Fresco Bamboo Garden (Room 8)
      { cam: new THREE.Vector3(-2.2, 1.6, -86), look: new THREE.Vector3(0, 1.5, -94), name: "Bamboo Garden" },
      // 9: Celebration & Banquet Suite (Room 9)
      { cam: new THREE.Vector3(1.5, 1.6, -102), look: new THREE.Vector3(0, 1.5, -110), name: "Celebrations" },
      // 10: 3D Photography Exhibition (Room 10)
      { cam: new THREE.Vector3(0, 1.6, -118), look: new THREE.Vector3(0, 1.6, -126), name: "Photo Gallery" },
      // 11: VIP Table Reservation & Contact (Room 11)
      { cam: new THREE.Vector3(-0.8, 1.4, -134), look: new THREE.Vector3(0, 1.3, -140), name: "Reservation" },
    ];

    // Expose virtual tour camera jump
    useImperativeHandle(ref, () => ({
      flyToZone: (zoneIndex: number) => {
        const wp = WAYPOINTS[Math.max(0, Math.min(zoneIndex, WAYPOINTS.length - 1))];
        if (!cameraRef.current || !wp) return;

        isInteractingTourRef.current = true;
        gsap.to(cameraRef.current.position, {
          x: wp.cam.x,
          y: wp.cam.y,
          z: wp.cam.z,
          duration: 1.8,
          ease: "power3.inOut",
          onUpdate: () => {
            targetLookAtRef.current.copy(wp.look);
          },
          onComplete: () => {
            setTimeout(() => {
              isInteractingTourRef.current = false;
            }, 600);
          },
        });
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Detect mobile / low-power devices
      const isMobile = window.innerWidth < 768;
      const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75);

      // ── 1. Scene & Camera Setup ──
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x17110c);
      scene.fog = new THREE.FogExp2(0x17110c, 0.024);

      const camera = new THREE.PerspectiveCamera(
        54,
        container.clientWidth / container.clientHeight,
        0.1,
        220
      );
      camera.position.copy(WAYPOINTS[0].cam);
      targetLookAtRef.current.copy(WAYPOINTS[0].look);
      currentLookAtRef.current.copy(WAYPOINTS[0].look);
      camera.lookAt(currentLookAtRef.current);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.shadowMap.enabled = false;
      rendererRef.current = renderer;

      container.appendChild(renderer.domElement);

      // ── 2. Texture Loader & Material Presets ──
      const textureLoader = new THREE.TextureLoader();
      const loadTex = (url: string) => {
        const tex = textureLoader.load(url);
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        return tex;
      };

      // Real restaurant images as textures
      const texDining = loadTex("/uploads/gtg-luxury-dining-lounge.jpg");
      const texMandala = loadTex("/uploads/gurdaspur-mandala-wall.jpg");
      const texBamboo = loadTex("/uploads/gurdaspur-bamboo-garden.jpg");
      const texCoffee = loadTex("/uploads/gtg-coffee-cappuccino.jpg");
      const texTandoori = loadTex("/uploads/gtg-tandoori-sizzler.jpg");
      const texFeast = loadTex("/uploads/gtg-punjabi-royal-feast.jpg");
      const texPizza = loadTex("/uploads/gtg-pizza-pasta-feast.jpg");
      const texMocktail = loadTex("/uploads/gtg-mocktail-drink.jpg");
      const texParty = loadTex("/uploads/gtg-party-celebration.jpg");
      const texVip = loadTex("/uploads/gtg-vip-reservation.jpg");

      // Materials matching luxury palette
      const matDarkWood = new THREE.MeshStandardMaterial({
        color: 0x241810,
        roughness: 0.72,
        metalness: 0.1,
      });

      const matPolishedFloor = new THREE.MeshStandardMaterial({
        color: 0x1e150e,
        roughness: 0.38,
        metalness: 0.15,
      });

      const matCopper = new THREE.MeshStandardMaterial({
        color: 0xb88952,
        roughness: 0.32,
        metalness: 0.85,
      });

      const matChampagneGold = new THREE.MeshStandardMaterial({
        color: 0xd8b477,
        roughness: 0.28,
        metalness: 0.9,
      });

      const matWarmWall = new THREE.MeshStandardMaterial({
        color: 0x22170f,
        roughness: 0.9,
      });

      const matCreamFabric = new THREE.MeshStandardMaterial({
        color: 0xf3e8d2,
        roughness: 0.85,
      });

      // ── 3. Global Ambient & Architectural Lighting ──
      const ambientLight = new THREE.AmbientLight(0xffecd2, 0.75);
      scene.add(ambientLight);

      // Warm overhead lights that populate each zone
      const zoneLights: THREE.PointLight[] = [];
      const addZoneLight = (x: number, y: number, z: number, color = 0xffc870, intensity = 2.8, dist = 16) => {
        const light = new THREE.PointLight(color, intensity, dist);
        light.position.set(x, y, z);
        light.castShadow = false; // Avoid exceeding MAX_TEXTURE_IMAGE_UNITS
        scene.add(light);
        zoneLights.push(light);

        // Hanging lantern / pendant geometry
        const cordGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.2, 8);
        const cordMesh = new THREE.Mesh(cordGeo, matCopper);
        cordMesh.position.set(x, y + 0.6, z);
        scene.add(cordMesh);

        const shadeGeo = new THREE.ConeGeometry(0.35, 0.28, 16, 1, true);
        const shadeMesh = new THREE.Mesh(shadeGeo, matCopper);
        shadeMesh.position.set(x, y + 0.05, z);
        scene.add(shadeMesh);

        const bulbGeo = new THREE.SphereGeometry(0.08, 12, 12);
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff0d0 });
        const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
        bulbMesh.position.set(x, y - 0.05, z);
        scene.add(bulbMesh);

        return light;
      };

      // ── 4. Continuous Floor, Ceiling Beams & Architecture ──
      // Polished dark wooden flooring stretching along Z axis from +35 to -150
      const floorLength = 190;
      const floorGeo = new THREE.PlaneGeometry(16, floorLength);
      const floorMesh = new THREE.Mesh(floorGeo, matPolishedFloor);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.set(0, 0, -55);
      floorMesh.receiveShadow = !isMobile;
      scene.add(floorMesh);

      // Ceiling with cross-beams
      const ceilingGeo = new THREE.PlaneGeometry(16, floorLength);
      const ceilingMesh = new THREE.Mesh(ceilingGeo, matDarkWood);
      ceilingMesh.rotation.x = Math.PI / 2;
      ceilingMesh.position.set(0, 3.8, -55);
      scene.add(ceilingMesh);

      // Wooden architectural ceiling beams every 6 meters
      const beamGeo = new THREE.BoxGeometry(16.2, 0.35, 0.45);
      for (let z = 30; z >= -145; z -= 6.5) {
        const beam = new THREE.Mesh(beamGeo, matDarkWood);
        beam.position.set(0, 3.65, z);
        scene.add(beam);
      }

      // Walls along the sides with arched openings
      const wallMat = matWarmWall;
      const leftWallGeo = new THREE.BoxGeometry(0.4, 4, floorLength);
      const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
      leftWall.position.set(-8, 2, -55);
      scene.add(leftWall);

      const rightWall = new THREE.Mesh(leftWallGeo, wallMat);
      rightWall.position.set(8, 2, -55);
      scene.add(rightWall);

      // Helper to build realistic tables with chairs
      const buildTable = (x: number, z: number, shape: "round" | "rect" = "round") => {
        const group = new THREE.Group();
        group.position.set(x, 0, z);

        // Table Top
        if (shape === "round") {
          const topGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.06, 24);
          const topMesh = new THREE.Mesh(topGeo, matDarkWood);
          topMesh.position.y = 0.75;
          group.add(topMesh);

          // Table cloth runner
          const runnerGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.07, 24);
          const runnerMesh = new THREE.Mesh(runnerGeo, matCreamFabric);
          runnerMesh.position.y = 0.76;
          group.add(runnerMesh);

          // Pedestal base
          const legGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.72, 16);
          const legMesh = new THREE.Mesh(legGeo, matCopper);
          legMesh.position.y = 0.36;
          group.add(legMesh);

          const baseGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.04, 20);
          const baseMesh = new THREE.Mesh(baseGeo, matCopper);
          baseMesh.position.y = 0.02;
          group.add(baseMesh);
        } else {
          const topGeo = new THREE.BoxGeometry(1.6, 0.06, 1.0);
          const topMesh = new THREE.Mesh(topGeo, matDarkWood);
          topMesh.position.y = 0.75;
          group.add(topMesh);

          const legGeo = new THREE.BoxGeometry(0.08, 0.72, 0.08);
          for (let dx of [-0.68, 0.68]) {
            for (let dz of [-0.38, 0.38]) {
              const leg = new THREE.Mesh(legGeo, matCopper);
              leg.position.set(dx, 0.36, dz);
              group.add(leg);
            }
          }
        }

        // Tableware: glowing candle & plates
        const candleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 12);
        const candleMesh = new THREE.Mesh(candleGeo, matCreamFabric);
        candleMesh.position.set(0, 0.82, 0);
        group.add(candleMesh);

        const flameGeo = new THREE.SphereGeometry(0.025, 8, 8);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
        const flameMesh = new THREE.Mesh(flameGeo, flameMat);
        flameMesh.position.set(0, 0.9, 0);
        group.add(flameMesh);

        // Small candle point light
        const candleLight = new THREE.PointLight(0xffa540, 0.55, 3.5);
        candleLight.position.set(0, 0.95, 0);
        group.add(candleLight);

        // 2 or 4 Chairs around table
        const chairGeo = new THREE.BoxGeometry(0.45, 0.45, 0.06);
        const chairBackGeo = new THREE.BoxGeometry(0.45, 0.5, 0.05);
        for (let angle of [0, Math.PI]) {
          const chairGroup = new THREE.Group();
          const dist = 1.1;
          chairGroup.position.set(Math.sin(angle) * dist, 0, Math.cos(angle) * dist);
          chairGroup.rotation.y = angle + Math.PI;

          const seat = new THREE.Mesh(chairGeo, matDarkWood);
          seat.position.y = 0.45;
          chairGroup.add(seat);

          const back = new THREE.Mesh(chairBackGeo, matDarkWood);
          back.position.set(0, 0.7, 0.2);
          chairGroup.add(back);

          group.add(chairGroup);
        }

        scene.add(group);
        return group;
      };

      // Helper to build 3D framed photographic art panels on walls
      const buildPhotoPanel = (
        x: number,
        y: number,
        z: number,
        width: number,
        height: number,
        tex: THREE.Texture,
        rotY = 0
      ) => {
        const group = new THREE.Group();
        group.position.set(x, y, z);
        group.rotation.y = rotY;

        // Copper frame
        const frameGeo = new THREE.BoxGeometry(width + 0.16, height + 0.16, 0.08);
        const frameMesh = new THREE.Mesh(frameGeo, matCopper);
        group.add(frameMesh);

        // Photo canvas plane
        const canvasGeo = new THREE.PlaneGeometry(width, height);
        const canvasMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.35,
          metalness: 0.05,
        });
        const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
        canvasMesh.position.z = 0.045;
        group.add(canvasMesh);

        scene.add(group);
        return group;
      };

      // ── ZONE 0: EXTERIOR ENTRANCE (Hero) ──
      addZoneLight(0, 2.9, 22, 0xffd28a, 3.2, 16);
      addZoneLight(-3.5, 2.4, 25, 0xb88952, 1.8, 10);
      addZoneLight(3.5, 2.4, 25, 0xb88952, 1.8, 10);

      // Grand Entrance Arch / Portal at Z = 18
      const archPortalGeo = new THREE.BoxGeometry(6.4, 3.6, 0.4);
      const archPortal = new THREE.Mesh(archPortalGeo, matDarkWood);
      archPortal.position.set(0, 1.8, 18);
      scene.add(archPortal);

      // Glass entrance doors (translucent amber)
      const doorGeo = new THREE.PlaneGeometry(2.4, 2.8);
      const doorMat = new THREE.MeshPhysicalMaterial({
        color: 0x3a2818,
        transparent: true,
        opacity: 0.65,
        roughness: 0.1,
        transmission: 0.7,
      });
      const leftDoor = new THREE.Mesh(doorGeo, doorMat);
      leftDoor.position.set(-1.25, 1.4, 18.02);
      scene.add(leftDoor);

      const rightDoor = new THREE.Mesh(doorGeo, doorMat);
      rightDoor.position.set(1.25, 1.4, 18.02);
      scene.add(rightDoor);

      // "GET TO GETHER" glowing entrance sign board above door
      const signBoardGeo = new THREE.BoxGeometry(3.6, 0.7, 0.12);
      const signBoard = new THREE.Mesh(signBoardGeo, matCopper);
      signBoard.position.set(0, 3.1, 18.2);
      scene.add(signBoard);

      // Potted topiary plants flanking entrance
      for (let px of [-2.4, 2.4]) {
        const potGeo = new THREE.CylinderGeometry(0.3, 0.22, 0.65, 16);
        const pot = new THREE.Mesh(potGeo, matCopper);
        pot.position.set(px, 0.32, 23);
        scene.add(pot);

        const plantGeo = new THREE.SphereGeometry(0.48, 12, 12);
        const plantMat = new THREE.MeshStandardMaterial({ color: 0x1f2e1a, roughness: 0.9 });
        const plant = new THREE.Mesh(plantGeo, plantMat);
        plant.position.set(px, 0.88, 23);
        scene.add(plant);
      }

      // ── ZONE 1: DINING SANCTUARY (Z = 16 to 6) ──
      addZoneLight(0, 2.8, 12, 0xffc470, 2.8, 12);
      addZoneLight(-2.5, 2.6, 8, 0xffb860, 2.2, 10);
      addZoneLight(2.5, 2.6, 8, 0xffb860, 2.2, 10);

      buildTable(-2.2, 12, "rect");
      buildTable(2.2, 10, "round");
      buildTable(-2.2, 6, "round");
      buildTable(2.2, 4, "rect");

      // Framed Real Customer Dining Lounge Photos on walls
      buildPhotoPanel(-7.75, 2.0, 10, 3.2, 1.9, texDining, Math.PI / 2);
      buildPhotoPanel(7.75, 2.0, 10, 3.2, 1.9, texDining, -Math.PI / 2);

      // ── ZONE 2: MANDALA FEATURE WALL (Z = 2 to -6) ──
      addZoneLight(0, 2.8, -2, 0xffca78, 3.5, 14);
      addZoneLight(0, 1.8, -3.5, 0xd8b477, 2.0, 6);

      // Monumental Architectural 3D Mandala Wall at Z = -4
      const mandalaWallGroup = new THREE.Group();
      mandalaWallGroup.position.set(0, 2.0, -4.5);

      // Backing feature alcove
      const alcoveGeo = new THREE.BoxGeometry(6.5, 3.6, 0.25);
      const alcoveMesh = new THREE.Mesh(alcoveGeo, matWarmWall);
      mandalaWallGroup.add(alcoveMesh);

      // Mandala circular center with authentic photo texture
      const mandalaDiscGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 48);
      const mandalaMat = new THREE.MeshStandardMaterial({
        map: texMandala,
        roughness: 0.4,
        metalness: 0.25,
      });
      const mandalaDisc = new THREE.Mesh(mandalaDiscGeo, mandalaMat);
      mandalaDisc.rotation.x = Math.PI / 2;
      mandalaDisc.position.z = 0.16;
      mandalaWallGroup.add(mandalaDisc);

      // Concentric metallic brass & copper rings around mandala
      for (let r of [1.68, 1.92, 2.15]) {
        const ringGeo = new THREE.TorusGeometry(r, 0.035, 12, 64);
        const ring = new THREE.Mesh(ringGeo, matChampagneGold);
        ring.position.z = 0.2;
        mandalaWallGroup.add(ring);
      }

      // Spherical geometric chandelier in front of mandala
      const chandelierGroup = new THREE.Group();
      chandelierGroup.position.set(0, 2.4, -2.5);
      const chRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.02, 12, 32), matCopper);
      const chRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.02, 12, 32), matChampagneGold);
      chRing2.rotation.x = Math.PI / 2;
      const chRing3 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.02, 12, 32), matCopper);
      chRing3.rotation.y = Math.PI / 3;
      chandelierGroup.add(chRing1, chRing2, chRing3);

      const chCenter = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xfffae0 })
      );
      chandelierGroup.add(chCenter);
      scene.add(chandelierGroup);
      scene.add(mandalaWallGroup);

      // ── ZONE 3: ARTISANAL COFFEE LOUNGE (Z = -10 to -22) ──
      addZoneLight(-1.5, 2.6, -16, 0xffbe6b, 3.2, 12);
      addZoneLight(2.2, 2.4, -18, 0xb88952, 2.0, 10);

      // Coffee Bar Counter
      const coffeeCounterGeo = new THREE.BoxGeometry(4.2, 1.05, 1.1);
      const coffeeCounter = new THREE.Mesh(coffeeCounterGeo, matDarkWood);
      coffeeCounter.position.set(-2.5, 0.525, -17);
      scene.add(coffeeCounter);

      // Polished dark stone counter top
      const coffeeTopGeo = new THREE.BoxGeometry(4.3, 0.08, 1.2);
      const coffeeTop = new THREE.Mesh(coffeeTopGeo, matPolishedFloor);
      coffeeTop.position.set(-2.5, 1.08, -17);
      scene.add(coffeeTop);

      // Espresso Machine on counter
      const espressoGroup = new THREE.Group();
      espressoGroup.position.set(-3.2, 1.12, -17);
      const espBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.65, 0.6), matCopper);
      espBody.position.y = 0.325;
      const espHead = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.15, 12), matChampagneGold);
      espHead.position.set(0, 0.15, 0.32);
      espressoGroup.add(espBody, espHead);
      scene.add(espressoGroup);

      // Floating 3D Porcelain Coffee Cup hero object
      const coffeeCupGroup = new THREE.Group();
      coffeeCupGroup.position.set(-1.0, 1.55, -16);

      const cupBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.18, 0.32, 24),
        new THREE.MeshStandardMaterial({ color: 0xfbf8f1, roughness: 0.25 })
      );
      const coffeeLiquid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.02, 24),
        new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.3 })
      );
      coffeeLiquid.position.y = 0.12;

      const saucer = new THREE.Mesh(
        new THREE.CylinderGeometry(0.38, 0.38, 0.03, 24),
        new THREE.MeshStandardMaterial({ color: 0xfbf8f1, roughness: 0.25 })
      );
      saucer.position.y = -0.16;

      const cupHandle = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 12, 24), matChampagneGold);
      cupHandle.position.set(0.24, 0.02, 0);
      cupHandle.rotation.y = Math.PI / 2;

      coffeeCupGroup.add(cupBody, coffeeLiquid, saucer, cupHandle);
      scene.add(coffeeCupGroup);

      // Floating Coffee Beans around cup
      const coffeeBeans: THREE.Mesh[] = [];
      const beanGeo = new THREE.SphereGeometry(0.04, 10, 8);
      beanGeo.scale(1, 1.4, 0.7);
      const beanMat = new THREE.MeshStandardMaterial({ color: 0x301a0d, roughness: 0.6 });
      for (let i = 0; i < 8; i++) {
        const bean = new THREE.Mesh(beanGeo, beanMat);
        const angle = (i / 8) * Math.PI * 2;
        bean.position.set(
          -1.0 + Math.cos(angle) * 0.55,
          1.55 + (Math.random() - 0.5) * 0.4,
          -16 + Math.sin(angle) * 0.55
        );
        scene.add(bean);
        coffeeBeans.push(bean);
      }

      // Real Coffee photo on wall
      buildPhotoPanel(7.75, 2.0, -16, 3.2, 2.0, texCoffee, -Math.PI / 2);

      // ── ZONE 4: LIVE CHARCOAL TANDOOR (Z = -24 to -36) ──
      addZoneLight(1.5, 2.6, -30, 0xff7722, 3.8, 12);
      addZoneLight(1.0, 1.2, -31, 0xff4400, 2.5, 6);

      // Clay Tandoor Oven (cylindrical clay pot with glowing core)
      const tandoorGroup = new THREE.Group();
      tandoorGroup.position.set(1.2, 0.65, -31);

      const clayMat = new THREE.MeshStandardMaterial({
        color: 0x6e432a,
        roughness: 0.95,
        bumpScale: 0.05,
      });

      const tandoorPot = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.85, 1.25, 24, 1, true), clayMat);
      const tandoorRim = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.06, 12, 32), matCopper);
      tandoorRim.rotation.x = Math.PI / 2;
      tandoorRim.position.y = 0.625;

      // Hot Glowing Charcoal Bed at bottom of tandoor
      const coalGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.1, 16);
      const coalMat = new THREE.MeshBasicMaterial({ color: 0xff3b00 });
      const coalMesh = new THREE.Mesh(coalGeo, coalMat);
      coalMesh.position.y = -0.4;

      // Metal skewers sticking out of tandoor
      for (let s = 0; s < 4; s++) {
        const skewer = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.4, 8), matCopper);
        skewer.rotation.z = 0.18 * (s % 2 === 0 ? 1 : -1);
        skewer.rotation.x = 0.15 * (s > 1 ? 1 : -1);
        skewer.position.set((s - 1.5) * 0.16, 0.45, 0);
        tandoorGroup.add(skewer);
      }

      tandoorGroup.add(tandoorPot, tandoorRim, coalMesh);
      scene.add(tandoorGroup);

      // Real Tandoori Sizzler photo panel
      buildPhotoPanel(-7.75, 2.0, -30, 3.2, 2.0, texTandoori, Math.PI / 2);

      // ── ZONE 5: SIGNATURE FOOD SHOWCASE (Z = -38 to -50) ──
      addZoneLight(0, 2.7, -44, 0xffd28a, 3.2, 12);
      addZoneLight(-2.5, 2.2, -44, 0xb88952, 2.0, 10);
      addZoneLight(2.5, 2.2, -44, 0xb88952, 2.0, 10);

      // Floating Pedestal Plate with Punjabi Royal Feast
      const foodDisplayGroup = new THREE.Group();
      foodDisplayGroup.position.set(0, 1.35, -45);

      const pedestalGeo = new THREE.CylinderGeometry(0.4, 0.55, 0.85, 24);
      const pedestalMesh = new THREE.Mesh(pedestalGeo, matDarkWood);
      pedestalMesh.position.y = -0.45;
      foodDisplayGroup.add(pedestalMesh);

      const plateGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.05, 32);
      const plateMesh = new THREE.Mesh(plateGeo, matCopper);
      foodDisplayGroup.add(plateMesh);

      // Glossy Food Disc with real photo texture
      const foodDiscGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.04, 32);
      const foodDisc = new THREE.Mesh(
        foodDiscGeo,
        new THREE.MeshStandardMaterial({
          map: texFeast,
          roughness: 0.35,
          metalness: 0.1,
        })
      );
      foodDisc.position.y = 0.045;
      foodDisplayGroup.add(foodDisc);
      scene.add(foodDisplayGroup);

      // Flanking food photo panels
      buildPhotoPanel(-7.75, 2.0, -44, 3.0, 2.0, texPizza, Math.PI / 2);
      buildPhotoPanel(7.75, 2.0, -44, 3.0, 2.0, texTandoori, -Math.PI / 2);

      // ── ZONE 6: 3D INTERACTIVE MENU REALM (Z = -52 to -64) ──
      addZoneLight(0, 2.8, -58, 0xffc470, 3.2, 14);

      // Floating 3D Menu Category Display Panels in arc
      const menuArcGroup = new THREE.Group();
      menuArcGroup.position.set(0, 1.8, -58);
      for (let m = -2; m <= 2; m++) {
        const cardGroup = new THREE.Group();
        const angle = (m * Math.PI) / 8;
        cardGroup.position.set(Math.sin(angle) * 3.6, 0, Math.cos(angle) * 1.5 - 1.5);
        cardGroup.rotation.y = -angle;

        const cardGeo = new THREE.BoxGeometry(1.2, 1.6, 0.05);
        const cardMesh = new THREE.Mesh(cardGeo, matDarkWood);
        const cardBorder = new THREE.Mesh(new THREE.BoxGeometry(1.24, 1.64, 0.04), matCopper);
        cardBorder.position.z = -0.01;
        cardGroup.add(cardMesh, cardBorder);
        menuArcGroup.add(cardGroup);
      }
      scene.add(menuArcGroup);

      // ── ZONE 7: SIGNATURE SIPS MOCKTAIL SANCTUARY (Z = -66 to -78) ──
      addZoneLight(1.5, 2.6, -72, 0x55ccff, 3.0, 12);
      addZoneLight(-1.5, 2.4, -72, 0xffd28a, 2.0, 10);

      // Floating Mocktail Glass
      const mocktailGroup = new THREE.Group();
      mocktailGroup.position.set(0.8, 1.45, -72);

      const glassGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.65, 24, 1, true);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x2288cc,
        transparent: true,
        opacity: 0.55,
        roughness: 0.1,
        transmission: 0.85,
        ior: 1.5,
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      mocktailGroup.add(glassMesh);

      // Ice cubes in glass
      for (let ic = 0; ic < 3; ic++) {
        const ice = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.12, 0.12),
          new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.75,
            roughness: 0.2,
          })
        );
        ice.position.set((ic - 1) * 0.06, (ic - 1) * 0.14, 0);
        ice.rotation.set(ic * 0.4, ic * 0.6, 0);
        mocktailGroup.add(ice);
      }

      // Citrus lime wheel on glass rim
      const limeWheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.02, 16),
        new THREE.MeshStandardMaterial({ color: 0x88cc22, roughness: 0.4 })
      );
      limeWheel.position.set(0.22, 0.32, 0);
      limeWheel.rotation.z = Math.PI / 4;
      mocktailGroup.add(limeWheel);
      scene.add(mocktailGroup);

      // Real Mocktail drink photo on wall
      buildPhotoPanel(-7.75, 2.0, -72, 3.0, 2.0, texMocktail, Math.PI / 2);

      // ── ZONE 8: AL-FRESCO BAMBOO GARDEN (Z = -80 to -94) ──
      addZoneLight(0, 2.9, -86, 0xffd28a, 2.5, 14);
      addZoneLight(-2.5, 2.2, -88, 0x88bb77, 1.8, 10);

      // Swaying Bamboo Stalks along the terrace
      const bambooStalks: THREE.Mesh[] = [];
      const bambooGeo = new THREE.CylinderGeometry(0.05, 0.06, 3.8, 12);
      const bambooMat = new THREE.MeshStandardMaterial({ color: 0x3d4e28, roughness: 0.8 });
      for (let b = 0; b < 24; b++) {
        const stalk = new THREE.Mesh(bambooGeo, bambooMat);
        const bx = (b % 2 === 0 ? -6.2 : 6.2) + (Math.random() - 0.5) * 1.2;
        const bz = -80 - (b / 24) * 14 + (Math.random() - 0.5) * 1.0;
        stalk.position.set(bx, 1.9, bz);
        scene.add(stalk);
        bambooStalks.push(stalk);
      }

      // Outdoor Garden Dining Table
      buildTable(0, -88, "round");

      // Hanging Festoon Fairy Lights
      for (let f = -3; f <= 3; f++) {
        const fairy = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xffe899 })
        );
        fairy.position.set(f * 1.1, 3.1 + Math.sin(f) * 0.15, -87);
        scene.add(fairy);
      }

      buildPhotoPanel(7.75, 2.0, -88, 3.2, 2.0, texBamboo, -Math.PI / 2);

      // ── ZONE 9: CELEBRATION & BANQUET SUITE (Z = -96 to -110) ──
      addZoneLight(0, 2.8, -102, 0xffc470, 3.5, 14);

      // Floating Metallic Balloons
      const balloons: THREE.Mesh[] = [];
      const balloonGeo = new THREE.SphereGeometry(0.28, 16, 16);
      balloonGeo.scale(1, 1.25, 1);
      const bMats = [matCopper, matChampagneGold, matDarkWood];
      for (let bl = 0; bl < 9; bl++) {
        const bMesh = new THREE.Mesh(balloonGeo, bMats[bl % 3]);
        bMesh.position.set(
          (bl % 3 - 1) * 1.4 + (Math.random() - 0.5) * 0.4,
          2.4 + (bl % 2) * 0.6,
          -100 - (bl / 9) * 8
        );
        scene.add(bMesh);
        balloons.push(bMesh);
      }

      buildPhotoPanel(-7.75, 2.0, -102, 3.2, 2.0, texParty, Math.PI / 2);
      buildTable(0, -104, "rect");

      // ── ZONE 10: 3D PHOTOGRAPHY EXHIBITION GALLERY (Z = -112 to -124) ──
      addZoneLight(0, 2.8, -118, 0xffd28a, 3.5, 14);

      // Floating Gallery Frames suspended in staggered 3D depths
      const galleryFrames: THREE.Group[] = [];
      const galleryData = [
        { tex: texDining, pos: [-2.2, 1.8, -116], rotY: 0.15 },
        { tex: texMandala, pos: [2.2, 1.6, -117], rotY: -0.15 },
        { tex: texCoffee, pos: [-1.8, 1.7, -120], rotY: 0.12 },
        { tex: texTandoori, pos: [1.8, 1.9, -121], rotY: -0.12 },
        { tex: texBamboo, pos: [0, 1.8, -123], rotY: 0 },
      ];
      for (const item of galleryData) {
        const frame = buildPhotoPanel(item.pos[0], item.pos[1], item.pos[2], 2.2, 1.4, item.tex, item.rotY);
        galleryFrames.push(frame);
      }

      // ── ZONE 11: VIP TABLE RESERVATION & FAREWELL (Z = -126 to -142) ──
      addZoneLight(0, 2.8, -134, 0xffb860, 3.5, 14);

      // Intimate VIP corner table
      const vipTable = buildTable(0, -134, "round");
      // Brass reservation plaque on table
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.06), matCopper);
      plaque.position.set(0.18, 0.82, 0.15);
      vipTable.add(plaque);

      buildPhotoPanel(-7.75, 2.0, -134, 3.2, 2.0, texVip, Math.PI / 2);
      buildPhotoPanel(7.75, 2.0, -134, 3.2, 2.0, texDining, -Math.PI / 2);

      // ── 5. Dynamic Particle Systems ──

      // System A: Atmospheric Dust Motes (golden flecks floating in light beams)
      const dustCount = isMobile ? 120 : 350;
      const dustGeo = new THREE.BufferGeometry();
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount * 3; i += 3) {
        dustPositions[i] = (Math.random() - 0.5) * 14;
        dustPositions[i + 1] = Math.random() * 3.6;
        dustPositions[i + 2] = 28 - Math.random() * 170;
      }
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xffd28a,
        size: 0.05,
        transparent: true,
        opacity: 0.45,
      });
      const dustPoints = new THREE.Points(dustGeo, dustMat);
      scene.add(dustPoints);

      // System B: Coffee Steam Particles
      const steamCount = 35;
      const steamGeo = new THREE.BufferGeometry();
      const steamPositions = new Float32Array(steamCount * 3);
      for (let i = 0; i < steamCount * 3; i += 3) {
        steamPositions[i] = -1.0 + (Math.random() - 0.5) * 0.16;
        steamPositions[i + 1] = 1.65 + Math.random() * 0.55;
        steamPositions[i + 2] = -16 + (Math.random() - 0.5) * 0.16;
      }
      steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
      const steamMat = new THREE.PointsMaterial({
        color: 0xffecd0,
        size: 0.08,
        transparent: true,
        opacity: 0.35,
      });
      const steamPoints = new THREE.Points(steamGeo, steamMat);
      scene.add(steamPoints);

      // System C: Tandoor Fire / Ember Particles
      const fireCount = 45;
      const fireGeo = new THREE.BufferGeometry();
      const firePositions = new Float32Array(fireCount * 3);
      for (let i = 0; i < fireCount * 3; i += 3) {
        firePositions[i] = 1.2 + (Math.random() - 0.5) * 0.35;
        firePositions[i + 1] = 0.5 + Math.random() * 0.9;
        firePositions[i + 2] = -31 + (Math.random() - 0.5) * 0.35;
      }
      fireGeo.setAttribute("position", new THREE.BufferAttribute(firePositions, 3));
      const fireMat = new THREE.PointsMaterial({
        color: 0xff5500,
        size: 0.09,
        transparent: true,
        opacity: 0.85,
      });
      const firePoints = new THREE.Points(fireGeo, fireMat);
      scene.add(firePoints);

      // System D: Mocktail Carbonation Bubbles
      const bubbleCount = 28;
      const bubbleGeo = new THREE.BufferGeometry();
      const bubblePositions = new Float32Array(bubbleCount * 3);
      for (let i = 0; i < bubbleCount * 3; i += 3) {
        bubblePositions[i] = 0.8 + (Math.random() - 0.5) * 0.16;
        bubblePositions[i + 1] = 1.25 + Math.random() * 0.4;
        bubblePositions[i + 2] = -72 + (Math.random() - 0.5) * 0.16;
      }
      bubbleGeo.setAttribute("position", new THREE.BufferAttribute(bubblePositions, 3));
      const bubbleMat = new THREE.PointsMaterial({
        color: 0xddf4ff,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
      });
      const bubblePoints = new THREE.Points(bubbleGeo, bubbleMat);
      scene.add(bubblePoints);

      // ── 6. GSAP ScrollTrigger Camera Trajectory Binding ──
      let activeIndex = 0;

      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          if (isInteractingTourRef.current) return;
          const p = self.progress; // 0.0 to 1.0

          // Determine current segment index
          const totalSegments = WAYPOINTS.length - 1;
          const scaledP = p * totalSegments;
          const segIndex = Math.min(Math.floor(scaledP), totalSegments - 1);
          const segFraction = scaledP - segIndex;

          const currentWp = WAYPOINTS[segIndex];
          const nextWp = WAYPOINTS[segIndex + 1];

          if (currentWp && nextWp) {
            targetCameraPosRef.current.lerpVectors(currentWp.cam, nextWp.cam, segFraction);
            targetLookAtRef.current.lerpVectors(currentWp.look, nextWp.look, segFraction);
          }

          if (segIndex !== activeIndex) {
            activeIndex = segIndex;
            onZoneChange?.(segIndex);
          }
        },
      });

      // ── 7. Pointer Movement / Mouse Parallax ──
      const handlePointerMove = (e: MouseEvent) => {
        mousePosRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        };
      };
      window.addEventListener("mousemove", handlePointerMove, { passive: true });

      // ── 8. Render Animation Loop ──
      let animId: number;
      let lastTime = performance.now();
      const startTime = performance.now();

      const animate = () => {
        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;
        const elapsedTime = (now - startTime) / 1000;

        // Smooth camera lerping
        if (!isInteractingTourRef.current) {
          // Add subtle mouse parallax to camera position
          const pxOffset = mousePosRef.current.x * 0.25;
          const pyOffset = -mousePosRef.current.y * 0.15;

          camera.position.x += (targetCameraPosRef.current.x + pxOffset - camera.position.x) * 0.06;
          camera.position.y += (targetCameraPosRef.current.y + pyOffset - camera.position.y) * 0.06;
          camera.position.z += (targetCameraPosRef.current.z - camera.position.z) * 0.06;

          currentLookAtRef.current.x += (targetLookAtRef.current.x + pxOffset * 0.5 - currentLookAtRef.current.x) * 0.06;
          currentLookAtRef.current.y += (targetLookAtRef.current.y + pyOffset * 0.5 - currentLookAtRef.current.y) * 0.06;
          currentLookAtRef.current.z += (targetLookAtRef.current.z - currentLookAtRef.current.z) * 0.06;

          camera.lookAt(currentLookAtRef.current);
        }

        // Animate Chandelier slow rotation
        chandelierGroup.rotation.y = elapsedTime * 0.2;

        // Animate Floating Coffee Cup & Beans
        coffeeCupGroup.position.y = 1.55 + Math.sin(elapsedTime * 1.8) * 0.04;
        coffeeCupGroup.rotation.y = elapsedTime * 0.3;
        coffeeBeans.forEach((bean, idx) => {
          bean.position.y += Math.sin(elapsedTime * 2 + idx) * 0.001;
          bean.rotation.x += 0.01;
          bean.rotation.y += 0.015;
        });

        // Animate Steam Particles
        const sPos = steamGeo.attributes.position.array as Float32Array;
        for (let i = 1; i < steamCount * 3; i += 3) {
          sPos[i] += delta * 0.22;
          if (sPos[i] > 2.2) {
            sPos[i] = 1.65;
            sPos[i - 1] = -1.0 + (Math.random() - 0.5) * 0.16;
            sPos[i + 1] = -16 + (Math.random() - 0.5) * 0.16;
          }
        }
        steamGeo.attributes.position.needsUpdate = true;

        // Animate Tandoor Fire Embers
        const fPos = fireGeo.attributes.position.array as Float32Array;
        for (let i = 1; i < fireCount * 3; i += 3) {
          fPos[i] += delta * 0.65;
          if (fPos[i] > 1.4) {
            fPos[i] = 0.5;
            fPos[i - 1] = 1.2 + (Math.random() - 0.5) * 0.35;
            fPos[i + 1] = -31 + (Math.random() - 0.5) * 0.35;
          }
        }
        fireGeo.attributes.position.needsUpdate = true;

        // Animate Mocktail Bubbles
        const bPos = bubbleGeo.attributes.position.array as Float32Array;
        for (let i = 1; i < bubbleCount * 3; i += 3) {
          bPos[i] += delta * 0.18;
          if (bPos[i] > 1.7) {
            bPos[i] = 1.25;
            bPos[i - 1] = 0.8 + (Math.random() - 0.5) * 0.16;
            bPos[i + 1] = -72 + (Math.random() - 0.5) * 0.16;
          }
        }
        bubbleGeo.attributes.position.needsUpdate = true;

        // Animate Bamboo Stalks gentle sway in wind
        bambooStalks.forEach((stalk, idx) => {
          stalk.rotation.z = Math.sin(elapsedTime * 1.2 + idx) * 0.025;
        });

        // Animate Celebration Balloons gentle float
        balloons.forEach((balloon, idx) => {
          balloon.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.0012;
        });

        // Animate Food Pedestal gentle float
        foodDisplayGroup.rotation.y = elapsedTime * 0.15;

        // Render scene
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      animate();

      // ── 9. Window Resize Handler ──
      const handleResize = () => {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(animId);
        trigger.kill();
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [onZoneChange]);

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: "#17110C",
        }}
      />
    );
  }
);
