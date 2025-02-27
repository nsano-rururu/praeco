<template>
  <el-row :gutter="20">
    <el-col :span="generateKibanaDiscoverUrl ? 6 : 24">
      <el-form-item label="Kibana Discover">
        <el-switch
          id="generateKibanaDiscoverUrl"
          :value="generateKibanaDiscoverUrl"
          :disabled="viewOnly"
          @change="changeGenerateKibanaDiscoverUrl" />
        <label>Kibana Discover application.</label>
      </el-form-item>
    </el-col>

    <el-col v-if="generateKibanaDiscoverUrl" :span="6">
      <el-form-item label="APP URL" prop="kibanaDiscoverAppUrl" required>
        <el-input
          :value="kibanaDiscoverAppUrl"
          :disabled="viewOnly"
          placeholder="http://localhost:5601/app/discover#/"
          @input="kibanaDiscoverAppUrl = $event" />
        <label>The url of the Kibana Discover application used to generate the kibana_discover_url variable.</label>
      </el-form-item>
    </el-col>

    <el-col v-if="generateKibanaDiscoverUrl" :span="4">
      <el-form-item label="Kibana Version" prop="kibanaDiscoverVersion" required>
        <el-select
          v-model="kibanaDiscoverVersion"
          :disabled="viewOnly"
          placeholder=""
          class="el-select-wide">
          <el-option
            v-for="v in kibanaVersionOptions"
            :key="v.code"
            :label="v.name"
            :value="v.code" />
        </el-select>
        <label>Specifies the version of the Kibana Discover application.</label>
      </el-form-item>
    </el-col>

    <el-col v-if="generateKibanaDiscoverUrl" :span="6">
      <el-form-item label="Index Pattern Id" prop="kibanaDiscoverIndexPatternId" required>
        <el-input
          :value="kibanaDiscoverIndexPatternId"
          :disabled="viewOnly"
          @input="kibanaDiscoverIndexPatternId = $event" />
        <label>The id of the index pattern to link to in the Kibana Discover application.</label>
      </el-form-item>
    </el-col>

    <el-col v-if="generateKibanaDiscoverUrl" :span="6">
      <el-popover v-model="popKibanaDiscoverColumnsVisible" :class="{ 'is-invalid': !popKibanaDiscoverColumnsValid }">
        <template #reference>
          <span class="pop-trigger">
            <el-tooltip v-if="kibanaDiscoverColumns.length" :content="kibanaDiscoverColumns.join(', ')" placement="top">
              <span>Kibana Discover Columns ({{ kibanaDiscoverColumns.length }})</span>
            </el-tooltip>
            <span v-else>Kibana Discover Columns ({{ kibanaDiscoverColumns.length }})</span>
          </span>
        </template>
        <div>
          <el-form
            ref="kibanaDiscoverColumns"
            :model="$store.state.config.alert"
            label-position="top"
            style="width: 360px"
            @submit.native.prevent>
            <el-form-item
              v-for="(entry, index) in kibanaDiscoverColumns"
              :key="index"
              :prop="`kibanaDiscoverColumns.${index}`"
              :disabled="viewOnly"
              class="el-form-item-list"
              label=""
              required>
              <el-row :gutter="5" type="flex" justify="space-between">
                <el-col :span="20">
                  <el-input
                    v-model="kibanaDiscoverColumns[index]"
                    :disabled="viewOnly"
                    placeholder="Keyword"
                    @input="(val) => updateKibanaDiscoverColumns(val, index)" />
                </el-col>
                <el-col :span="4">
                  <el-button
                    :disabled="viewOnly"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    plain
                    @click="removeKibanaDiscoverColumnsEntry(entry)" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

          <el-button :disabled="viewOnly" class="m-n-sm" @click="addKibanaDiscoverColumnsEntry">
            Add keyword
          </el-button>
        </div>
      </el-popover>
    </el-col>

    <el-col v-if="generateKibanaDiscoverUrl" :span="6">
      <el-form-item :class="{ 'view-only': viewOnly }" label="From Timedelta">
        <ElastalertTimeView v-if="viewOnly" :time="kibanaDiscoverFromTimedelta" />
        <ElastalertTimePicker
          v-else-if="kibanaDiscoverFromTimedelta"
          id="kibanaDiscoverFromTimedelta"
          :allow-zero="true"
          :unit="Object.keys(kibanaDiscoverFromTimedelta)[0]"
          :amount="Object.values(kibanaDiscoverFromTimedelta)[0]"
          @input="updateKibanaDiscoverFromTimedelta" />
        <label>
          The offset to the from time of the Kibana Discover link's time range.<br>
          The from time is calculated by subtracting this timedelta from the event time.<br>
          Defaults to 10 minutes.
        </label>
      </el-form-item>
    </el-col>

    <el-col v-if="generateKibanaDiscoverUrl" :span="6">
      <el-form-item :class="{ 'view-only': viewOnly }" label="To Timedelta">
        <ElastalertTimeView v-if="viewOnly" :time="kibanaDiscoverToTimedelta" />
        <ElastalertTimePicker
          v-else-if="kibanaDiscoverToTimedelta"
          id="kibanaDiscoverToTimedelta"
          :allow-zero="true"
          :unit="Object.keys(kibanaDiscoverToTimedelta)[0]"
          :amount="Object.values(kibanaDiscoverToTimedelta)[0]"
          @input="updateKibanaDiscoverToTimedelta" />
        <label>
          The offset to the to time of the Kibana Discover link's time range.<br>
          The to time is calculated by adding this timedelta to the event time.<br>
          Defaults to 10 minutes.
        </label>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
import { kibanaVersionOptions } from '@/lib/kibanaVersionOptions.js';

export default {
  props: ['viewOnly'],
  emits: ['validate'],

  data() {
    return {
      popKibanaDiscoverColumnsVisible: false,
      popKibanaDiscoverColumnsValid: true,
      kibanaVersionOptions,
    };
  },

  computed: {
    generateKibanaDiscoverUrl: {
      get() {
        return this.$store.state.config.alert.generateKibanaDiscoverUrl;
      },
      set(value) {
        this.$store.commit('config/alert/UPDATE_GENERATE_KIBANA_DISCOVER_URL', value);
      }
    },

    kibanaDiscoverAppUrl: {
      get() {
        return this.$store.state.config.alert.kibanaDiscoverAppUrl;
      },
      set(value) {
        this.$store.commit('config/alert/UPDATE_KIBANA_DISCOVER_APP_URL', value);
      }
    },

    kibanaDiscoverVersion: {
      get() {
        return this.$store.state.config.alert.kibanaDiscoverVersion;
      },
      set(value) {
        this.$store.commit('config/alert/UPDATE_KIBANA_DISCOVER_VERSION', value);
      }
    },

    kibanaDiscoverIndexPatternId: {
      get() {
        return this.$store.state.config.alert.kibanaDiscoverIndexPatternId;
      },
      set(value) {
        this.$store.commit('config/alert/UPDATE_KIBANA_DISCOVER_INDEX_PATTERN_ID', value);
      }
    },

    kibanaDiscoverFromTimedelta: {
      get() {
        return this.$store.state.config.alert.kibanaDiscoverFromTimedelta || { minutes: 10 };
      },
      set(value) {
        this.$store.commit('config/alert/UPDATE_KIBANA_DISCOVER_FROM_TIMEDELTA', value);
      }
    },

    kibanaDiscoverToTimedelta: {
      get() {
        return this.$store.state.config.alert.kibanaDiscoverToTimedelta || { minutes: 10 };
      },
      set(value) {
        this.$store.commit('config/alert/UPDATE_KIBANA_DISCOVER_TO_TIMEDELTA', value);
      }
    },

    kibanaDiscoverColumns() {
      return this.$store.state.config.alert.kibanaDiscoverColumns;
    }
  },

  mounted() {
    this.generateKibanaDiscoverUrl = this.$store.state.config.alert.generateKibanaDiscoverUrl;

    this.$nextTick(() => {
      setTimeout(() => {
        this.validate();
      }, 10);
    });
  },

  methods: {
    updateKibanaDiscoverFromTimedelta(value) {
      this.kibanaDiscoverFromTimedelta = {};
      this.$set(this.kibanaDiscoverFromTimedelta, Object.keys(value)[0], Object.values(value)[0]);
    },

    updateKibanaDiscoverToTimedelta(value) {
      this.kibanaDiscoverToTimedelta = {};
      this.$set(this.kibanaDiscoverToTimedelta, Object.keys(value)[0], Object.values(value)[0]);
    },

    async validate() {
      try {
        if (this.$refs.kibanaDiscoverColumns) {
          await this.validateKibanaDiscoverColumns();
        }
        this.$emit('validate', true);
        return true;
      } catch (error) {
        this.$emit('validate', false);
        return false;
      }
    },

    async validateKibanaDiscoverColumns() {
      if (!this.kibanaDiscoverColumns.length) {
        this.popKibanaDiscoverColumnsValid = false;
        return;
      }

      try {
        this.popKibanaDiscoverColumnsValid = await this.$refs.kibanaDiscoverColumns.validate();
      } catch (error) {
        this.popKibanaDiscoverColumnsValid = false;
        throw error;
      }
    },

    updateKibanaDiscoverColumns(entry, index) {
      if (Number.isNaN(entry)) return;

      this.$store.commit('config/alert/UPDATE_KIBANA_DISCOVER_COLUMNS_ENTRY', {
        entry,
        index
      });
      this.$nextTick(() => {
        this.validate();
      });
    },

    removeKibanaDiscoverColumnsEntry(entry) {
      this.$store.commit('config/alert/REMOVE_KIBANA_DISCOVER_COLUMNS_ENTRY', entry);
      this.$nextTick(() => {
        this.validate();
      });
    },

    addKibanaDiscoverColumnsEntry() {
      this.$store.commit('config/alert/ADD_KIBANA_DISCOVER_COLUMNS_ENTRY');
      this.$nextTick(() => {
        this.validate();
      });
    },

    changeGenerateKibanaDiscoverUrl(val) {
      if (val) {
        this.generateKibanaDiscoverUrl = true;
      } else {
        this.generateKibanaDiscoverUrl = false;
      }
    }
  }
};
</script>
