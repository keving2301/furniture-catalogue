<template>
    <v-content>
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
    </v-content>
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
