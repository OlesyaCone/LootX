<script>
import Sortable from "sortablejs";
import "../guild/scss/app.scss";

export default {
  name: "App",
  data() {
    return {
      tiles: [
        { id: 1, isHunter: true },
        { id: 2, isHunter: false },
        { id: 3, isHunter: false },
        { id: 1, isHunter: true },
        { id: 2, isHunter: false },
        { id: 3, isHunter: true },
        { id: 1, isHunter: false },
        { id: 2, isHunter: false },
        { id: 3, isHunter: false },
        { id: 1, isHunter: true },
        { id: 2, isHunter: false },
        { id: 3, isHunter: false },
        { id: 1, isHunter: true },
        { id: 2, isHunter: false },
        { id: 3, isHunter: false },
      ],
      tileOrder: "",
      isSubmitDisabled: true,
      img: "https://wow.zamimg.com/images/wow/icons/large/inv_helmet_159.jpg",
      title: "Ghoul Commander's Cuirass",
      dignity: "Heroic",
      itlevel: 262,
      apparel: "Chest	Plate",
      phase: "Phase 4",
      characteristic: {
        armor: 2641,
        strength: 162,
        stamina: 207,
      },
      sockets: [
        {
          link: "https://www.wowhead.com/wotlkwotlk/items/gems?filter=81;3;0",
          text: "Yellow Socket",
        },
        {
          link: "https://www.wowhead.com/wotlkwotlk/items/gems?filter=81;4;0",
          text: "Blue Socket",
        },
        {
          link: "https://www.wowhead.com/wotlkwotlk/items/gems?filter=81;4;0",
          text: "Blue Socket",
        },
      ],
      bonus: "+8 Dodge Rating",
      durability: 165,
      rlevel: 80,
      effects: [
        {
          type: "equip",
          stat: "defense rating",
          value: 91,
          text: "Equip: Increases defense rating by 91.",
        },
        {
          type: "equip",
          stat: "dodge rating",
          value: 51,
          text: "Equip: Increases your dodge rating by 51.",
        },
        {
          type: "equip",
          stat: "parry rating",
          value: 85,
          text: "Equip: Increases your parry rating by 85.",
        },
      ],
      price: {
        gold: 17,
        silver: 64,
        bronze: 43,
      },
      dropped: "Lady Deathwhisper",
      dropch: 3.21,
    };
  },
  mounted() {
    this.initializeSortable();
    this.updateTileOrder();
  },
  methods: {
    initializeSortable() {
      const container = this.$refs.tilesContainer;
      new Sortable(container, {
        animation: 150,
        onEnd: () => {
          this.updateTileOrder();
          this.enableSubmitButton();
        },
      });
    },
    updateTileOrder() {
      const tileOrder = Array.from(this.$refs.tilesContainer.children)
        .map((tile) => tile.dataset.id)
        .join(",");
      this.tileOrder = tileOrder;
    },
    enableSubmitButton() {
      this.isSubmitDisabled = false;
    },
    handleSubmit() {
      console.log("Tile Order:", this.tileOrder);
    },
  },
};
</script>

<template>
  <div class="app">
    <div class="left-side">
      <img :src="img" class="border" alt="Item icon" />
      <div class="card">
        <div class="group">
          <p class="title ">{{ title }}</p>
          <p class="socet">{{ phase }}</p>
          <p class="green">{{ dignity }}</p>
          <p class="level">Item Level {{ itlevel }}</p>
          <p>Binds when picked up</p>
          <div class="apparel">
            <p>{{ apparel }}</p>
            <span class="line">Armor: {{ characteristic.armor }}</span>
            <span class="line">Strength: {{ characteristic.strength }}</span>
            <span class="line">Stamina: {{ characteristic.stamina }}</span>
          </div>
        </div>

        <div class="group soсet" >
          <span class="line" v-for="(socket, index) in sockets" :key="index">
            <a :href="socket.link" >
              {{ socket.text }}
            </a>
          </span>
          <span class="line socket-bonus" v-if="bonus">
            Socket Bonus: {{ bonus }}
          </span>
        </div>

        <div class="group">
          <p>Durability {{ durability }} / 165</p>
          <p>Requires Level {{ rlevel }}</p>
          <div class="green">
            <p v-for="(effect, index) in effects" :key="index" class="line">
              {{ effect.text }}
            </p>
          </div>
          <p>
            Sell Price:
            <span class="gold">{{ price.gold }}g</span>
            <span class="silver">{{ price.silver }}s</span>
            <span class="bronze">{{ price.bronze }}c</span>
          </p>
          <p>Dropped by: {{ dropped }}</p>
          <p>Drop Chance: {{ dropch }}%</p>
        </div>
      </div>
    </div>

    <div class="right-side">
      <form @submit.prevent="handleSubmit">
        <div ref="tilesContainer">
          <div
            v-for="(tile, index) in tiles"
            :key="`${tile.id}-${index}`"
            :data-id="tile.id"
          >
            <div :class="['tile', 'todoist', { hunter: tile.isHunter }]">
              Tile {{ tile.id }}
            </div>
          </div>
        </div>
        <input type="hidden" name="tile_order" :value="tileOrder" />
        <button type="submit" class="btn" :disabled="isSubmitDisabled">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
