// ==========================================
// ОБЩАЯ БАЗА ДАННЫХ ИГРЫ (доступна во всех макетах)
// ==========================================

globalThis.DB = {
    // Баланс из ГДД
    BALANCE: {
        K: 4,               // общий коэффициент баланса в формуле урона
        CRIT_CHANCE: 0.1,   // базовый шанс крита
        ESCAPE_CHANCE: 0.6  // базовый шанс побега
    },

    // Шаблоны партии (согласно ГДД: HP, специализации, лимит слотов умений)
    PARTY_TEMPLATES: {
        me:  { name: "Я",   hp: 500, maxHp: 500, sp: 64,  maxSp: 64,  maxSkills: 8, skills: ["cleave"], spec: { phys: 1.0, mag: 1.0, heal: 1.0 } },
        he:  { name: "ОН",  hp: 600, maxHp: 600, sp: 40,  maxSp: 40,  maxSkills: 4, skills: ["bash"],   spec: { phys: 1.4, mag: 0.7, heal: 0.8 } },
        she: { name: "ОНА", hp: 450, maxHp: 450, sp: 116, maxSp: 116, maxSkills: 4, skills: ["kouha"],  spec: { phys: 0.7, mag: 1.3, heal: 1.4 } }
    },

    // Справочник умений (type: cut / gun / blunt / holy / occult / heal / buff)
    // costType: "hp_pct" (% от maxHp) или "sp"
    SKILLS: {
        // Cut
        cleave:      { name: "Cleave",      type: "cut",    target: "single_enemy", costType: "hp_pct", cost: 4,  power: 100, accuracy: 0.95 },
        gale_slash:  { name: "Gale Slash",  type: "cut",    target: "single_enemy", costType: "hp_pct", cost: 6,  power: 196, accuracy: 0.95 },
        debaser:     { name: "Debaser",     type: "cut",    target: "all_enemies",  costType: "hp_pct", cost: 10, power: 100, accuracy: 0.90 },

        // Gun
        single_shot: { name: "Single Shot", type: "gun",    target: "single_enemy", costType: "hp_pct", cost: 4,  power: 144, accuracy: 0.90 },
        bullet_hell: { name: "Bullet Hell", type: "gun",    target: "all_enemies",  costType: "hp_pct", cost: 10, power: 64,  accuracy: 0.85 },
        atomizer:    { name: "Atomizer",    type: "gun",    target: "single_enemy", costType: "hp_pct", cost: 10, power: 324, accuracy: 0.85 },

        // Blunt
        bash:        { name: "Bash",        type: "blunt",  target: "single_enemy", costType: "hp_pct", cost: 4,  power: 100, accuracy: 0.95 },
        sonic_punch: { name: "Sonic Punch", type: "blunt",  target: "single_enemy", costType: "hp_pct", cost: 6,  power: 144, accuracy: 0.95 },
        bloodhail:   { name: "Bloodhail",   type: "blunt",  target: "single_enemy", costType: "hp_pct", cost: 12, power: 400, accuracy: 0.85 },

        // Holy
        kouha:       { name: "Kouha",       type: "holy",   target: "single_enemy", costType: "sp",     cost: 4,  power: 100, accuracy: 0.95 },
        makouha:     { name: "Makouha",     type: "holy",   target: "all_enemies",  costType: "sp",     cost: 8,  power: 64,  accuracy: 0.95 },
        kougaon:     { name: "Kougaon",     type: "holy",   target: "single_enemy", costType: "sp",     cost: 10, power: 324, accuracy: 0.95 },
        makougaon:   { name: "Makougaon",   type: "holy",   target: "all_enemies",  costType: "sp",     cost: 16, power: 196, accuracy: 0.95 },

        // Occult
        eiga:        { name: "Eiga",        type: "occult", target: "single_enemy", costType: "sp",     cost: 4,  power: 100, accuracy: 0.95 },
        maeiga:      { name: "Maeiga",      type: "occult", target: "all_enemies",  costType: "sp",     cost: 8,  power: 64,  accuracy: 0.95 },
        eigaon:      { name: "Eigaon",      type: "occult", target: "single_enemy", costType: "sp",     cost: 10, power: 324, accuracy: 0.95 },
        maeigaon:    { name: "Maeigaon",    type: "occult", target: "all_enemies",  costType: "sp",     cost: 16, power: 196, accuracy: 0.95 },

        // Лечение
        dia:         { name: "Dia",         type: "heal",   target: "single_ally",  costType: "sp",     cost: 6,  power: 200 },
        media:       { name: "Media",       type: "heal",   target: "all_allies",   costType: "sp",     cost: 12, power: 125 },

        // Баффы (длительность 3 хода)
        fermata:     { name: "Fermata",     type: "buff",   target: "single_ally",  costType: "sp",     cost: 12, buff: { atk: 1.3 } },
        staccato:    { name: "Staccato",    type: "buff",   target: "single_ally",  costType: "sp",     cost: 12, buff: { def: 1.3 } },
        heat_riser:  { name: "Heat Riser",  type: "buff",   target: "single_ally",  costType: "sp",     cost: 24, buff: { atk: 1.6, def: 1.6 } }
    },

    // Предметы
    ITEMS: {
        "Аптечка": { name: "Аптечка", heal: 40, battleUsable: true }
    },

    // Противники (ключ = instance variable EnemyType у объекта Enemy)
    ENEMIES: {
        "default": {
            name: "Helpless Child",
            hp: 300,
            canEscape: true,
            affinities: { blunt: "vuln", holy: "resist" },
            skills: ["cleave", "dia"],
            drops: [
                { skillId: "cleave", chance: 0 },
                { skillId: "dia",    chance: 1.0 } // !!! Временно повышен шанс выпадения с целью проверки !!!
            ]
        },
        "helpless_child": {
            name: "Helpless Child",
            hp: 300,
            canEscape: true,
            affinities: {},
            skills: ["cleave", "dia"],
            drops: [
                { skillId: "cleave", chance: 0.15 },
                { skillId: "dia",    chance: 0.10 }
            ]
        },
        "weakling": {
            name: "Weakling",
            hp: 350,
            canEscape: true,
            affinities: { occult: "vuln", holy: "null" },
            skills: ["bash", "kouha"],
            drops: [
                { skillId: "bash",  chance: 0.15 },
                { skillId: "kouha", chance: 0.10 }
            ]
        }
    }
};

// Инициализация партии при первом запуске
globalThis.initPartyIfNeeded = () => {
    if (!globalThis.gameParty || typeof globalThis.gameParty[0]?.sp !== "number") {
        const t = globalThis.DB.PARTY_TEMPLATES.me;
        globalThis.gameParty = [{ id: "me", ...t, skills: [...t.skills] }];
    }
};

// Добавление союзника в партию
globalThis.addPartyMember = (id) => {
    globalThis.initPartyIfNeeded();
    if (globalThis.gameParty.some(m => m.id === id)) return;
    const t = globalThis.DB.PARTY_TEMPLATES[id];
    if (t) globalThis.gameParty.push({ id, ...t, skills: [...t.skills] });
};