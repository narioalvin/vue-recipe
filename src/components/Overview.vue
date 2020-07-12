<template>
  <div class="main">
    <div v-if="loading" class="loader">
      <img class="hithere" src="../assets/img/logo.svg" alt="" />
      <h3 class="title">Recipe</h3>
    </div>
    <div v-else class="content">
      <header>
        <img src="../assets/img/logo.svg" alt="" />
        <h3 class="title">Recipe</h3>
      </header>
      <section class="main">
        <div class="left">
          <h4 class="headline">Thinking of what to cook?</h4>
          <p>
            Search for 1.7+ million nutritionally analyzed recipes Detailed
            macro and micronutrient data Filter by calories, diets and
            allergens.
          </p>
          <div class="search-form">
            <b-form-input
              size="lg"
              v-model="query"
              placeholder="Search for recipe"
              @keyup.enter="search(query)"
            ></b-form-input>
            <b-button variant="primary" pill @click="search(query)"
              ><font-awesome-icon
                class="search-icon"
                :icon="['fas', 'search']"
              />
            </b-button>
          </div>
        </div>
        <div class="right">
          <img width="200" src="../assets/img/front.png" alt="" />
        </div>
      </section>
      <section class="categories">
        <h4>Categories</h4>
        <div class="recipe-row">
          <div
            v-for="(item, index) in categories"
            :key="index"
            @click="search(item.name)"
            class="lozad recipe-cols"
            :data-background-image="require(`../assets/img/${item.name}.jpg`)"
          >
            <div class="p-2">
              <h6>{{ item.title }}</h6>
              <label>View All</label>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <img src="../assets/img/logo.svg" alt="" />
      </footer>
    </div>
  </div>
</template>

<script>
import lozad from 'lozad';

export default {
  name: 'Overview',
  data() {
    return {
      query: '',
      categories: [
        {
          name: 'breakfast',
          title: 'Breakfast',
        },
        {
          name: 'salads',
          title: 'Salads',
        },
        {
          name: 'appetizer',
          title: 'Appetizer',
        },
        {
          name: 'soup',
          title: 'Soup',
        },
        {
          name: 'desserts',
          title: 'Desserts',
        },
        {
          name: 'main',
          title: 'Main Dish',
        },
      ],
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      const observer = lozad();
      observer.observe();
    }, 2000);
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  methods: {
    search(value) {
      this.$router.push({ name: 'Results', params: { query: value } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.title {
  font-family: 'Pacifico', sans-serif;
}

header {
  height: 60px;
  @include flex(flex-start, flex-start, row);

  h3 {
    font-size: 38px;
    letter-spacing: 2px;
  }

  img {
    width: 40px;
    margin-right: 10px;
  }
}

footer {
  @include flex(center, center, row);
  margin-top: 20px;
  height: 100px;

  img {
    width: 50px;
  }
}

h4 {
  font-weight: bold;
}

.main {
  color: #ffffff;

  .content {
    padding: 15px;

    .main {
      @include flex(flex-start, center, column);
      margin-bottom: 50px;

      .left {
        width: 100%;
        @include flex(flex-start, center, column);
        order: 1;

        .search-form {
          width: 100%;
          position: relative;

          button {
            position: absolute;
            right: 3px;
            padding: 8px;
            width: 45px;
            top: 34%;
          }
        }

        .headline {
          margin-bottom: 10px;
        }

        input {
          margin-top: 20px;
        }
      }

      .right {
        width: 100%;
        height: 300px;
        @include flex(center, center, column);
      }
    }
  }

  .categories {
    .recipe-row {
      margin: 20px 0;

      .recipe-cols {
        margin-bottom: 20px;
        height: 300px;
        border-radius: 15px;
        box-shadow: 10px 10px 16px 0px rgba(0, 0, 0, 0.28);
        position: relative;
        overflow: hidden;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;

        &:focus,
        &:hover {
          &::after {
            transform: scale(1.1);
          }
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: inherit;
          background-size: cover;
          transform-origin: center;
          transition: transform 0.2s ease-in-out;
        }

        img {
          width: 100%;
        }

        .p-2 {
          position: absolute;
          z-index: 1;
          bottom: 10px;
          background-color: rgba(0, 0, 0, 0.4);
          color: #ffffff;
          min-width: 110px;
        }
      }
    }
  }
}

@media (min-width: 360px) {
  h4 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
  }
}

@media (min-width: 400px) {
  h4 {
    font-size: 39px;
  }

  p {
    font-size: 22px;
  }

  .main .content .main .right {
    height: 350px;

    img {
      width: 250px;
    }
  }
}

@media (min-width: 576px) {
  .main .categories .recipe-row {
    @include flex(center, flex-start, row);
    flex-wrap: wrap;

    .recipe-cols {
      width: 31%;
      margin-right: 20px;

      &:nth-child(3) {
        margin-right: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

@media (min-width: 768px) {
  .main .content {
    padding: 15px 30px;
    .main {
      height: 90vh;
      flex-direction: row;
      align-items: center;
      margin-bottom: 0;

      .left {
        order: 0;
      }
    }
  }
}

@media (min-width: 992px) {
  .main .content {
    padding: 15px 100px;
  }
}

@media (min-width: 1224px) {
  .main .content .main .right img {
    width: 400px;
  }

  h4 {
    font-size: 50px;
  }
}
</style>
