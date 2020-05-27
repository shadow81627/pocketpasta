<template>
  <b-card
    no-body
    tag="section"
    class="performance-facts"
    itemscope
    itemtype="http://schema.org/NutritionInformation"
  >
    <b-card-header header-tag="header" class="p-1">
      <b-button
        v-b-toggle:collapse-performance-facts
        block
        variant="none"
        squared
        class="text-left"
      >
        <h2>Nutrition Facts</h2>
      </b-button>
    </b-card-header>
    <b-collapse id="collapse-performance-facts" visible>
      <b-card-body>
        <header class="performance-facts__header">
          <p itemprop="servingSize">Serving Size: {{ servingSize }}</p>
          <!-- <p>Serving Per Container 8</p> -->
        </header>
        <table class="performance-facts__table">
          <thead>
            <tr>
              <th colspan="3" class="small-info">
                Amount Per Serving
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colspan="2">
                <b>Calories</b>
                <span itemprop="calories">{{ calories }}</span>
              </th>
              <td>
                Calories from Fat
                <span itemprop="fiberContent">{{ fiberContent }}</span>
              </td>
            </tr>
            <tr class="thick-row">
              <td colspan="3" class="small-info">
                <b>% Daily Value*</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Total Fat</b>
                <span itemprop="fatContent">{{ fatContent }}</span>
              </th>
              <td>
                <!-- <b>22%</b> -->
              </td>
            </tr>
            <tr>
              <td class="blank-cell" />
              <th>
                Saturated Fat
                <span itemprop="saturatedFatContent">{{
                  saturatedFatContent
                }}</span>
              </th>
              <td>
                <!-- <b>22%</b> -->
              </td>
            </tr>
            <tr>
              <td class="blank-cell" />
              <th>
                Trans Fat
                <span itemprop="unsaturatedFatContent">{{
                  unsaturatedFatContent
                }}</span>
              </th>
              <td />
            </tr>
            <tr>
              <th colspan="2">
                <b>Cholesterol</b>
                <span itemprop="cholesterolContent">{{
                  cholesterolContent
                }}</span>
              </th>
              <td>
                <!-- <b>18%</b> -->
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Sodium</b>
                <span itemprop="sodiumContent">{{ sodiumContent }}</span>
              </th>
              <td>
                <!-- <b>2%</b> -->
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Total Carbohydrate</b>
                <span itemprop="carbohydrateContent">{{
                  carbohydrateContent
                }}</span>
              </th>
              <td>
                <!-- <b>6%</b> -->
              </td>
            </tr>
            <tr>
              <td class="blank-cell" />
              <th>
                Dietary Fiber
                <span itemprop="fiberContent">{{ fiberContent }}</span>
              </th>
              <td>
                <!-- <b>4%</b> -->
              </td>
            </tr>
            <tr>
              <td class="blank-cell" />
              <th>
                Sugars
                <span itemprop="sugarContent">{{ sugarContent }}</span>
              </th>
              <td />
            </tr>
            <tr class="thick-end">
              <th colspan="2">
                <b>Protein</b>
                <span itemprop="proteinContent">{{ proteinContent }}</span>
              </th>
              <td />
            </tr>
          </tbody>
        </table>

        <!-- <table class="performance-facts__table--grid">
      <tbody>
        <tr>
          <td colspan="2">
            Vitamin A 10%
          </td>
          <td>
            Vitamin C 0%
          </td>
        </tr>
        <tr class="thin-end">
          <td colspan="2">
            Calcium 10%
          </td>
          <td>
            Iron 6%
          </td>
        </tr>
      </tbody>
    </table> -->

        <p class="small-info">
          * Percent Daily Values are based on a 2,000 calorie diet. Your daily
          values may be higher or lower depending on your calorie needs:
        </p>

        <!-- <table class="performance-facts__table--small small-info">
      <thead>
        <tr>
          <td colspan="2" />
          <th>Calories:</th>
          <th>2,000</th>
          <th>2,500</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colspan="2">Total Fat</th>
          <td>Less than</td>
          <td>65g</td>
          <td>80g</td>
        </tr>
        <tr>
          <td class="blank-cell" />
          <th>Saturated Fat</th>
          <td>Less than</td>
          <td>20g</td>
          <td>25g</td>
        </tr>
        <tr>
          <th colspan="2">Cholesterol</th>
          <td>Less than</td>
          <td>300mg</td>
          <td>300 mg</td>
        </tr>
        <tr>
          <th colspan="2">Sodium</th>
          <td>Less than</td>
          <td>2,400mg</td>
          <td>2,400mg</td>
        </tr>
        <tr>
          <th colspan="3">Total Carbohydrate</th>
          <td>300g</td>
          <td>375g</td>
        </tr>
        <tr>
          <td class="blank-cell" />
          <th colspan="2">Dietary Fiber</th>
          <td>25g</td>
          <td>30g</td>
        </tr>
      </tbody>
    </table> -->

        <!-- <p class="small-info">
      Calories per gram:
    </p>
    <p class="small-info text-center">
      Fat 9 &bull; Carbohydrate 4 &bull; Protein 4
    </p> -->
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
import { BCollapse, VBToggle } from 'bootstrap-vue';
export default {
  components: {
    BCollapse,
  },
  directives: { 'b-toggle': VBToggle },
  inheritAttrs: false,
  props: {
    calories: { type: String, default: null },
    carbohydrateContent: { type: String, default: null },
    cholesterolContent: { type: String, default: null },
    fatContent: { type: String, default: null },
    fiberContent: { type: String, default: null },
    proteinContent: { type: String, default: null },
    saturatedFatContent: { type: String, default: null },
    servingSize: { type: String, default: null },
    sodiumContent: { type: String, default: null },
    sugarContent: { type: String, default: null },
    unsaturatedFatContent: { type: String, default: null },
  },
};
</script>

<style lang="scss" scoped>
.performance-facts {
  // border: 1px solid black;
  // margin: 20px;
  // float: left;
  // width: 280px;
  // padding: 0.5rem;
  table {
    border-collapse: collapse;
  }
}
.performance-facts__title {
  font-weight: bold;
  font-size: 2rem;
  margin: 0 0 0.25rem 0;
}
.performance-facts__header {
  border-bottom: 10px solid black;
  padding: 0 0 0.25rem 0;
  margin: 0 0 0.5rem 0;
  p {
    margin: 0;
  }
}
.performance-facts__table {
  width: 100%;
  thead tr {
    th,
    td {
      border: 0;
    }
  }
  th,
  td {
    font-weight: normal;
    text-align: left;
    padding: 0.25rem 0;
    border-top: 1px solid black;
    white-space: nowrap;
  }
  td {
    &:last-child {
      text-align: right;
    }
  }
  .blank-cell {
    width: 1rem;
    border-top: 0;
  }
  .thick-row {
    th,
    td {
      border-top-width: 5px;
    }
  }
}
.small-info {
  font-size: 0.7rem;
}

.performance-facts__table--small {
  @extend .performance-facts__table;
  border-bottom: 1px solid #999;
  margin: 0 0 0.5rem 0;
  thead {
    tr {
      border-bottom: 1px solid black;
    }
  }
  td {
    &:last-child {
      text-align: left;
    }
  }
  th,
  td {
    border: 0;
    padding: 0;
  }
}

.performance-facts__table--grid {
  @extend .performance-facts__table;
  margin: 0 0 0.5rem 0;
  td {
    &:last-child {
      text-align: left;
      &::before {
        content: '•';
        font-weight: bold;
        margin: 0 0.25rem 0 0;
      }
    }
  }
}

.text-center {
  text-align: center;
}
.thick-end {
  border-bottom: 10px solid black;
}
.thin-end {
  border-bottom: 1px solid black;
}
</style>
