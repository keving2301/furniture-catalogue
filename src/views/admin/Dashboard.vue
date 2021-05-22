<template>
    <div>
        <v-row>
            <v-col cols="6">
                <DashBoardCard :title="'Number of Sounds'" color="primary" :data="sounds.length"
                :icon="'mdi-playlist-music'" />
            </v-col>
            <v-col cols="6">
                <DashBoardCard :title="'Number of Bedroom Set'" color="error" :data="bedroomSets.length"
                :icon = "'mdi-folder-multiple'" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">

                <v-simple-table class="elevation-4">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Number of Sounds per Category</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical/>
                            <v-spacer />
                        </v-toolbar>
                    </template>
                    <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">Bedroom Sets Name</th>
                            <th class="text-left">Number of Sounds</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(group, bedroomSets_id) in groups" :key="bedroomSets_id">
                            <td>{{ getBedroomSetById(bedroomSets_id).title }}</td>
                            <td>{{ group.length }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <!--
            <div v-for="(group, category_id) in groups" :key="category_id">
                <h2>{{ getCategoryById(category_id).title }}</h2>
                <p>{{ group.length }}</p>
            </div>
            -->
        </v-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DashBoardCard from '../../components/DashBoardCard';


function groupBy(array, key){
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]){
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}

export default {
    data() {
        return { }
    },
    components: {
        DashBoardCard
    },
    created() {
        this.loadBedroomSets;
        this.sounds;
    },
    methods: {
        getBedroomSetById: function(id) {
            let bedroomSet = this.bedroomSets.filter(c => c.id == id)[0];
            if(bedroomSet === undefined) {
                console.log('undefined qarşim');
                return {title: 'Unknown'};
            }
            return bedroomSet;
        }
    },
    computed: {
        ...mapActions({
            loadBedroomSets: 'bedroomSets/loadBedroomSets',
            loadSounds: 'sounds/loadSounds'
        }),
        ...mapGetters({
            bedroomSets: 'bedroomSets/getBedroomSets',
            sounds: 'sounds/getSounds'
        }),
        groups(){
            return groupBy(this.sounds, 'bedroomSet_id')
        }
    }
}

</script>
