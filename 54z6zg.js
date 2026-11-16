/* =====================================================================
   SAHNE AĞACI (video sürümü)
   Bu dosyayı düzenleyerek sahneleri, butonları ve metinleri değiştirebilirsiniz.

   AĞAÇ
   ─────────────────────────────────────────────────────────────────────
   main   (CAM 01 döngü)                          ← ana sahne
    └─ "End Of Line Systems" butonu
        │  giriş: CAM 02 ileri   ·   GERİ: CAM 02 ters
        ▼
       eol   (CAM 03 döngü)
        └─ "Stretch Wrapping Machines" butonu
            │  giriş: CAM 04 ileri   ·   GERİ: CAM 04 ters
            ▼
           wrap  (CAM 05 döngü)
   ─────────────────────────────────────────────────────────────────────

   KURALLAR
   • Her sahne:  parent (üst sahne), enter (girişte ileri oynayan sekans),
                 loop (sahnedeyken dönen sekans).
   • GERİ butonu: enter sekansını ters oynatır ve parent sahneye döner.
   • Bir butonu işlevli yapmak için ona  go: "sahne-adı"  ekleyin.
     go yoksa buton sadece etikettir (işlevsiz).
   • Yeni alt sahne eklemek: sequences'a kameraları ekleyin, scenes'e
     yeni bir sahne yazın (parent/enter/loop), üst sahnedeki butona go verin.
   • x, y: butonun kare içindeki yeri (0 = sol/üst, 1 = sağ/alt).
     side: etiket noktanın "up" üstünde / "down" altında.
   • Videolar my0e6t/ klasöründe:  <dosya>-h.mp4 (masaüstü 2560x1440),
     <dosya>-m.mp4 (dokunmatik 1280x720). Giriş (enter) sekanslarının ters
     halleri: <dosya>-hr.mp4 ve <dosya>-mr.mp4 (GERİ için gerekli).
   ===================================================================== */

window.SCENE_TREE = {
  fps: 30,

  // Kamera sekansları → my0e6t/ içindeki video dosya adı (uzantısız, -h/-m eki olmadan)
  sequences: {
    cam01: "mb4xso",
    cam02: "f3xd0f",
    cam03: "7irso5",
    cam04: "6ndas7",
    cam05: "8gbgpa",
  },

  scenes: {

    /* ─────────── ANA SAHNE ─────────── */
    main: {
      loop: "cam01",
      bottomBar: true,           // alttaki 5 sütunlu bar
      hotspots: [
        { id: "receiving", label: "Goods Receiving & ATL<br>(Raw Material)", x: 0.190, y: 0.555, side: "up",
          bar: { w: 330, color: "red",  items: ["Smart Truck", "Pallet Conveyors"] } },
        { id: "warehouse", label: "Automated<br>Warehouse Systems", x: 0.306, y: 0.560, side: "down",
          bar: { w: 300, color: "gray", items: ["ASRS", "Crane", "Pallet Flow / Shuttle Racking Systems", "WMS / MES"] } },
        { id: "packaging", label: "Automated<br>Packaging Systems", x: 0.430, y: 0.515, side: "up",
          bar: { w: 262, color: "red",  items: ["Motion Up / Motor Lift", "Box Opening Robots", "Flex Conveyors", "Boxing Robots"] } },
        { id: "eol", label: "End Of Line<br>Systems", x: 0.526, y: 0.546, side: "down", go: "eol",
          bar: { w: 340, color: "gray", items: ["Sorter Systems", "Robotic Palletizing", "Pallet Securing", "Stretch Wrapping Machines", "Strapping Machine"] } },
        { id: "storage", label: "Automated Storage & ATL<br>(Finished Goods)", x: 0.672, y: 0.500, side: "up",
          bar: { w: 520, color: "red",  title: "Automated Storage & ATL Systems<br>(Finished Goods)", items: [] } },
      ],
    },

    /* ─────────── END OF LINE ─────────── */
    eol: {
      parent: "main",
      enter: "cam02",
      loop: "cam03",
      title: "End Of Line Systems",
      info: {
        title: "End Of Line<br>Systems",
        intro: "Fully automated end-of-line, from sorted cases to shipment-ready pallets.",
        listFromHotspots: true,  // paneldeki liste = bu sahnenin butonları (desc + icon)
      },
      hotspots: [
        { id: "sorter",    label: "Sorter Systems",               x: 0.335, y: 0.715, side: "down", icon: "sorter",
          desc: "Routes every case to the right palletizing line automatically." },
        { id: "palletize", label: "Robotic Palletizing",          x: 0.395, y: 0.490, side: "up",   icon: "robot",
          desc: "6-axis robots build stable single or mixed-SKU pallets around the clock." },
        { id: "strapping", label: "Strapping Machine",            x: 0.598, y: 0.300, side: "up",   icon: "strap",
          desc: "Locks load units with automatic strapping in seconds." },
        { id: "wrapping",  label: "Stretch Wrapping<br>Machines", x: 0.668, y: 0.390, side: "down", icon: "wrap", short: true, go: "wrap",
          desc: "Secures each pallet with consistent, film-optimized stretch wrapping." },
        { id: "securing",  label: "Pallet Securing",              x: 0.768, y: 0.520, side: "down", icon: "secure",
          desc: "Labeling and final checks make pallets ready for safe shipment." },
      ],
    },

    /* ─────────── STRETCH WRAPPING ─────────── */
    wrap: {
      parent: "eol",
      enter: "cam04",
      loop: "cam05",
      title: "Stretch Wrapping",
      info: {
        title: "Stretch<br>Wrapping",
        intro: "Developed with our partner TEMCON, the TPW200800t automatic stretch wrapper secures every pallet for safe transport and storage.",
        items: [
          { icon: "speed", name: "60 Pallets / Hour",   desc: "High-capacity wrapping with a 30 rpm rotating arm." },
          { icon: "film",  name: "Optimized Film Use",  desc: "Applies the optimal amount of stretch film for each load." },
          { icon: "auto",  name: "Fully Automatic",     desc: "Starts and completes wrapping without operator intervention." },
          { icon: "link",  name: "Ready to Integrate",  desc: "Works with AMRs, AGVs and ASRS in intralogistics lines." },
          { icon: "specs", name: "Flexible Sizes",      desc: "EURO pallets, 2000 mm standard wrap height (2200–3000 mm optional)." },
        ],
      },
      hotspots: [
        { id: "w-strapping", label: "Strapping Machine",            x: 0.360, y: 0.215, side: "down", short: true },
        { id: "w-wrapping",  label: "Stretch Wrapping<br>Machines", x: 0.600, y: 0.520, side: "up" },
      ],
    },

  },
};
