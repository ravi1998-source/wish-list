<template>
    <div id="app">
      <h1 class="subtitle has-text-centered">Wish List:</h1>
      <hr />

      <div class="field has-addons">

        <div class="control is-expanded">
          <input class="input" v-model="description" type="text" placeholder="Drop a wish..." />
        </div>

        <div class="control">
          <a class="button is-info" @click="addItem()" >Make a wish</a>
        </div>
      </div>


      <div class="notification" v-for="(item, i) in items" :key="item._id">

        <div class="columns">

          <input class="column input" v-if="isSelected(item)" v-model="editedDescription" />
          <p v-else class="column">
            <span class="tag is-primary">{{ i + 1}}</span>
            {{ item.description }}
          </p>

          <div class="column is-narrow">
            <span
              class="icon has-text-primary"
              @click="isSelected(item) ?  unselect() : select(item)"
            >
              <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
            </span>

            <span
              class="icon has-text-info"
              @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)"
            >
              <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>

            </span>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios"; //Used to handle HTTP request
export default {
  name: "App",

  //Initial data
  data() {
    return {
      items: [], //Keeps stores of the description
      description: "", //Pushes the data to the 
      editedDescription: "",
      selected: {}
    };
  },

//Mounted sends HTTP request to fetch data that component will render
  async mounted() { 
    const response = await axios.get("api/wishListItems/");
    this.items = response.data;
  },
  methods: {

    //Function to add item to the DOM
    async addItem() {
      const response = await axios.post("api/wishListItems/", {
        description: this.description
      });
      this.items.push(response.data);
      this.description = "";
    },

    //Removes items by fetching the id from json
    async removeItem(item, i) {
      await axios.delete("api/wishListItems/" + item._id);
      this.items.splice(i, 1);
    },

    //Helps the user access the current state of the item
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    
    //Used to access the item indivually
    isSelected(item) {
      return item._id === this.selected._id;
    },

    //Returns the items to the previous state
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },

    //Make changes to the existing item
    async updateItem(item, i) {
      const response = await axios.put("api/wishListItems/" + item._id, {
        description: this.editedDescription
      });
      this.items[i] = response.data;
      this.unselect();
    }
  }
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>