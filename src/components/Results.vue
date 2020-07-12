<template>
  <div class="main">
    <div v-if="loading" class="loader">
      <img class="hithere" src="../assets/img/logo.svg" alt="" />
      <h3 class="title">Recipe</h3>
    </div>
    <div v-else class="content">
      <header>
        <h5 class="back" @click="backHome">
          <font-awesome-icon
            class="icon mr-1"
            :icon="['fas', 'arrow-circle-left']"
          />Back
        </h5>

        <div class="header-content">
          <h2>
            Results for <span>{{ query }}</span>
          </h2>
          <div class="search-form">
            <b-form-input
              size="lg"
              v-model="searchQuery"
              placeholder="Search for recipe"
              @keyup.enter="search"
            ></b-form-input>
            <b-button variant="primary" pill @click="search"
              ><font-awesome-icon
                class="search-icon"
                :icon="['fas', 'search']"
              />
            </b-button>
          </div>
        </div>
      </header>
      <div class="search-loader" v-if="searchLoading">
        <img class="hithere" width="50" src="../assets/img/logo.svg" alt="" />
      </div>
      <div class="results-row" v-else>
        <div
          class="results-col"
          v-for="(item, index) in recipes"
          :key="index"
          @click="recipeClicked(item.recipe.url)"
        >
          <img :src="item.recipe.image" alt="" />
          <div class="p-2">
            <h6>{{ item.recipe.label }}</h6>
            <label>{{ item.recipe.source }}</label>
            <div class="info">
              <span
                ><font-awesome-icon
                  class="icon"
                  :icon="['fas', 'pizza-slice']"
                />{{ item.recipe.calories }} Calories
                <font-awesome-icon
                  class="icon"
                  :icon="['fas', 'shopping-cart']"
                />
                {{ item.recipe.ingredients.length }} Ingredients</span
              >
            </div>
          </div>
        </div>
      </div>
      <footer>
        <b-button
          v-if="recipes.length > 0 && !searchLoading"
          pill
          variant="primary"
          @click="loadMore"
          ><font-awesome-icon :icon="['fas', 'plus']" v-if="!loadMoreLoading"/>
          <b-spinner v-else class="more-loader" variant="light"></b-spinner
        ></b-button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Results',
  data() {
    return {
      recipeAppId: process.env.VUE_APP_ID,
      recipeAPIKey: process.env.VUE_APP_KEY,
      query: this.$route.params.query,
      recipes: [],
      loading: true,
      queryFrom: 0,
      queryTo: 12,
      searchQuery: '',
      isSearch: false,
      searchLoading: false,
      loadMoreLoading: false,
    };
  },
  created() {
    this.getRecipe();
  },
  methods: {
    getRecipe() {
      axios
        .get(
          `https://api.edamam.com/search?q=${this.query}&app_id=${this.recipeAppId}&app_key=${this.recipeAPIKey}&from=${this.queryFrom}&to=${this.queryTo}`
        )
        .then((response) => {
          const recipes = response.data.hits.map((item) => {
            item.recipe.calories = Math.round(item.recipe.calories);
            return item;
          });

          if (!this.isSearch) {
            this.recipes = recipes;
          }

          !this.isSearch
            ? (this.recipes = recipes)
            : this.recipes.push(...recipes);

          this.loading = false;
          this.loadMoreLoading = false;
        })
        .catch(() => {
          this.loading = false;
          this.loadMoreLoading = false;
        });
    },
    loadMore() {
      this.loadMoreLoading = true;
      this.queryFrom = this.queryFrom + 12;
      this.queryTo = this.queryTo + 12;
      this.isSearch = true;
      this.getRecipe();
    },
    search() {
      this.searchLoading = true;
      this.query = this.searchQuery;
      axios
        .get(
          `https://api.edamam.com/search?q=${this.searchQuery}&app_id=${this.recipeAppId}&app_key=${this.recipeAPIKey}&from=0&to=12`
        )
        .then((response) => {
          const recipes = response.data.hits.map((item) => {
            item.recipe.calories = Math.round(item.recipe.calories);
            return item;
          });
          this.recipes = recipes;
          this.searchLoading = false;
        })
        .catch(() => (this.searchLoading = false));
    },
    recipeClicked(value) {
      window.open(value);
    },
    backHome() {
      this.$router.push({ name: 'Overview' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

h2,
h3,
h5 {
  font-weight: bold;
}

.main {
  .content {
    padding: 15px;
    @include flex(flex-start, center, column);

    .search-loader {
      width: 100%;
      height: 70vh;
      @include flex(center, center, column);
    }

    .back {
      color: #ffffff;
      margin-bottom: 10px;
      cursor: pointer;
      width: 75px;

      &:hover {
        opacity: 0.7;
      }
    }

    header {
      width: 100%;

      .header-content {
        @include flex(flex-start, center, column);

        .search-form {
          position: relative;
          width: 100%;

          button {
            position: absolute;
            right: 3px;
            padding: 8px;
            width: 45px;
            top: 7%;
          }
        }
      }

      h2 {
        color: #ffffff;
        margin-bottom: 15px;

        span {
          text-transform: capitalize;
        }
      }
    }

    .results-row {
      margin: 20px 0;
      width: 100%;

      .results-col {
        margin-bottom: 30px;
        height: 300px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 10px 10px 16px 0px rgba(0, 0, 0, 0.28);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s ease-in-out;

          &:hover {
            transform: scale(1.1);
          }
        }

        .p-2 {
          position: absolute;
          bottom: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #ffffff;
          min-width: 110px;
          min-height: 85px;
          z-index: 1;

          .info span .icon {
            color: $main;
            margin-right: 3px;
          }
        }
      }
    }

    footer {
      width: 100%;
      text-align: center;

      button {
        padding: 8px;
        width: 42px;
        height: 42px;
        position: relative;

        .more-loader {
          position: absolute;
          width: 15px;
          height: 15px;
          left: 12px;
          bottom: 11px;
        }
      }
    }
  }
}

@media (min-width: 450px) {
  .main .content {
    .results-row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      .results-col {
        width: 46%;
        margin-right: 15px;

        .p-2 {
          font-size: 13px;

          h6 {
            font-size: 14px;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .main .content {
    header {
      padding: 0 30px 0 15px;

      .header-content {
        @include flex(center, space-between, row);
        margin-bottom: 15px;

        .search-form {
          width: 40%;
        }

        h2 {
          margin-bottom: 0;
        }
      }
    }

    h4 {
      margin-left: 15px;
    }
    .results-row .results-col {
      width: 30%;
    }
  }
}

@media (min-width: 992px) {
  .main .content {
    padding: 15px 80px;

    header {
      padding: 0 80px 0 50px;
    }

    .results-row .results-col {
      width: 20%;
      margin-right: 30px;
    }
  }
}
</style>
