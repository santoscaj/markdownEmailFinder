<template>
  <div id="templates-page">
    <div id="main-template">
      <div
        class="template"
        v-for="incident in incidents"
        :key="'inc-' + incident.title"
      >
        <div v-clipboard="() => incident.title" class="title incident">
          {{ incident.title }}
        </div>
        <div v-clipboard="() => incident.body" class="body">
          <pre>
                    {{ incident.body }}
                    </pre
          >
        </div>
      </div>

      <div
        class="template"
        v-for="maintenance in maintenances"
        :key="'maint-' + maintenance.title"
      >
        <div
          v-clipboard="() => maintenance.title"
          :id="maintenance.title"
          :class="'title ' + maintenance.type"
        >
          {{ maintenance.title }}
        </div>
        <div v-clipboard="() => maintenance.body" class="body">
          <pre>
                        {{ maintenance.body }}
                    </pre
          >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    keyword() {
      return this.$store.state.keyword;
    },
    incidents() {
      var keywordList = this.keyword.split(" ");

      var incidents = this.$store.state.templates.incidents.filter(inc => {
        var passed = true;
        for (var keyword of keywordList) {
          if (!keyword) continue;

          var regex = new RegExp(keyword, "i");
          if (!regex.test(inc.title)) {
            passed = false;
            break;
          }
        }
        return passed;
      });

      return incidents;
    },

    maintenances() {
      var keywordList = this.keyword.split(" ");

      var maintenances = this.$store.state.templates.maintenances.filter(
        maint => {
          var passed = true;
          for (var keyword of keywordList) {
            if (!keyword) continue;

            var regex = new RegExp(keyword, "i");
            if (!regex.test(maint.title)) {
              passed = false;
              break;
            }
          }
          return passed;
        }
      );

      return maintenances;
    },
    matches() {
      return this.incidents.concat(this.maintenances);
    }

  },
  methods: {}
};
</script>

<style scoped>
#templates-page {
  display: flex;
  justify-content: center;
}

#links {
  background-color: lightblue;
  width: 30%;
  border-left: 1px solid gray;
}

.hide {
  display: none;
}

#main-template {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.template {
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 7px;
  width: 50%;
  text-align: center;

}

.template:hover {
  border: 1px solid gray;
}

.incident {
  color: red;
}

.planned {
  color: green;
}

.emergency {
  color: orange;
}

.body {
  text-align: left;
  padding-left: 10px;
}

pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

@media (max-width: 1100px) {
  .template {
    width: 80%;
  }
}

@media (max-width: 700px) {
  .template {
    font-size: 12px;
  }
}

@media (max-width: 500px) {
  .template {
    width: 90%;
  }
}
</style>
