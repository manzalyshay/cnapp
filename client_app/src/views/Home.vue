<template>
  <v-container class="my-8" fluid>
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.id">{{ tab.name }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item
        v-for="tab in tabs"
        :key="tab.id"
        :bind="activeTab === tab.id"
      >
        <v-data-table
          :headers="tab.headers"
          :items="getDataForTab(tab.id)"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:top>
            <div class="pt-5">
              <div class="d-flex justify-end">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :loading="loading"
                      outlined
                      rounded
                      small
                      v-bind="attrs"
                      @click="downloadJson"
                      v-on="on"
                    >
                      Export
                    </v-btn>
                  </template>
                  Export to Json
                </v-tooltip>
              </div>
              <v-text-field
                v-model="search"
                class="mx-4"
                label="Filter"
              ></v-text-field>
            </div>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import downloadjs from "downloadjs";

export default {
  name: "home-page",

  data() {
    return {
      activeTab: 0,
      loading: false,
      search: "",
      tabs: [
        {
          id: 0,
          name: "Repositories",
          headers: [
            { text: "ID", value: "id" },
            { text: "Name", value: "name" },
            { text: "Scan ID", value: "scan_id" },
            { text: "Connected Image ID", value: "connected_image_id" },
            { text: "Updated date timestamp", value: "updated_date_timestamp" },
            { text: "Last Push", value: "last_push" },
            { text: "Size", value: "size" },
            { text: "Source", value: "source" },
            { text: "Total Findings", value: "total_findings" },
            { text: "URL", value: "url" },
            { text: "Created date timestamp", value: "created_date_timestamp" },
          ],
        },
        {
          id: 1,
          name: "Images",
          headers: [
            { text: "ID", value: "id" },
            { text: "Name", value: "name" },
            { text: "Scan ID", value: "scan_id" },
            {
              text: "Connected Repository ID",
              value: "connected_repository_id",
            },
            { text: "Updated date timestamp", value: "updated_date_timestamp" },
            { text: "Highest Severity", value: "highest_severity" },
            { text: "Total Findings", value: "total_findings" },
            { text: "Scan Date Timestamp", value: "scan_date_timestamp" },
            { text: "URL", value: "url" },
            { text: "Created Date Timestamp", value: "created_date_timestamp" },
            { text: "Number of Layers", value: "number_of_layers" },
            { text: "Architecture", value: "architecture" },
            { text: "Source", value: "source" },
          ],
        },
      ],
    };
  },
  methods: {
    getDataForTab(tabId) {
      return tabId === 0 ? this.repoData : this.imageData;
    },
    downloadJson() {
      const data = this.activeTab === 0 ? this.repoData : this.imageData;
      const name = this.activeTab === 0 ? "repository" : "image";
      downloadjs(JSON.stringify(data), `${name}.json`, "text/plain");
    },
  },
  computed: {
    repoData() {
      return this.$store.state.repoData;
    },
    imageData() {
      return this.$store.state.imageData;
    },
  },
  mounted() {
    this.$store.dispatch("fetchRepoData");
    this.$store.dispatch("fetchImageData");
  },
};
</script>

<style scoped></style>
