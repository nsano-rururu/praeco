import Vue from 'vue';
import Bulb from '@/components/Bulb';
import DateTime from '@/components/DateTime';
import DefinitionTable from '@/components/DefinitionTable';
import ElastalertTimePicker from '@/components/ElastalertTimePicker';
import ESChart from '@/components/ESChart';
import EventTable from '@/components/EventTable';
import ExpandableAlert from '@/components/ExpandableAlert';
import FolderTree from '@/components/FolderTree';
import NavTree from '@/components/NavTree';
import PraecoFormItem from '@/components/PraecoFormItem';
import TableRow from '@/components/TableRow';
import ElastalertTimeView from '@/components/ElastalertTimeView';
import ConfigQuery from '@/components/config/ConfigQuery.vue';
import ConfigAggregation from '@/components/config/ConfigAggregation.vue';
import ConfigAlert from '@/components/config/alert/ConfigAlert.vue';
import ConfigKibanaDiscover from '@/components/config/ConfigKibanaDiscover.vue';
import ConfigTimeWindowFeature from '@/components/config/ConfigTimeWindowFeature.vue';
import ConfigOwner from '@/components/config/ConfigOwner.vue';
import ConfigPriority from '@/components/config/ConfigPriority.vue';
import ConfigDescription from '@/components/config/ConfigDescription.vue';
import ConfigSettings from '@/components/config/ConfigSettings.vue';
import ConfigCondition from '@/components/config/ConfigCondition.vue';

Vue.component('Bulb', Bulb);
Vue.component('DateTime', DateTime);
Vue.component('ConfigQuery', ConfigQuery);
Vue.component('ConfigAlert', ConfigAlert);
Vue.component('ConfigAggregation', ConfigAggregation);
Vue.component('ConfigSettings', ConfigSettings);
Vue.component('ConfigKibanaDiscover', ConfigKibanaDiscover);
Vue.component('ConfigTimeWindowFeature', ConfigTimeWindowFeature);
Vue.component('ConfigOwner', ConfigOwner);
Vue.component('ConfigPriority', ConfigPriority);
Vue.component('ConfigDescription', ConfigDescription);
Vue.component('ConfigCondition', ConfigCondition);
Vue.component('DefinitionTable', DefinitionTable);
Vue.component('ElastalertTimePicker', ElastalertTimePicker);
Vue.component('ESChart', ESChart);
Vue.component('EventTable', EventTable);
Vue.component('ExpandableAlert', ExpandableAlert);
Vue.component('FolderTree', FolderTree);
Vue.component('NavTree', NavTree);
Vue.component('PraecoFormItem', PraecoFormItem);
Vue.component('TableRow', TableRow);
Vue.component('ElastalertTimeView', ElastalertTimeView);
