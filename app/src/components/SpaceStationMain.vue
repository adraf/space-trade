<script setup>
import getContent from '../helpers/getContent'
import PriceHistoryChart from './PriceHistoryChart.vue'
import { ref } from 'vue'

const stationData = ref({})
const selectedName = ref()
const selectedArtifact = ref()
const stationPricingHistory = ref()
const showGraph = ref(false)
let stationImage = ref('')

const getStationData = async() => {
  stationData.value = await getContent(selectedName.value.name, selectedArtifact.value.name, stationPricingHistory.value.name === 'Yes' ? true : false)
  stationPricingHistory.value.name === 'Yes' ? showGraph.value = true : showGraph.value = false
  getStationImage()
}

const getStationImage = async() => {
  switch(selectedName.value.name) {
    case 'Alpha Centauri':
      stationImage.value = '../src/assets/stations/Alpha.jpg'
      break
    case 'Beta Hydri':
      stationImage.value = '../src/assets/stations/Beta.jpg'
      break
    case 'Gamma Draconis':
      stationImage.value = '../src/assets/stations/Gamma.jpg'
      break
    case 'Delta Pavonis':
      stationImage.value = '../src/assets/stations/Delta.jpg'
      break
    case 'Epsilon Indi':
      stationImage.value = '../src/assets/stations/Epsilon.jpg'
      break
  }
}

const stationList = [
  { name: 'Alpha Centauri' },
  { name: 'Beta Hydri' },
  { name: 'Gamma Draconis' },
  { name: 'Delta Pavonis' },
  { name: 'Epsilon Indi' }
]

const artifactList = [
  { name: 'Gold' },
  { name: 'Silver' },
  { name: 'Food Rations' },
  { name: 'Water' },
  { name: 'Medicine' },
  { name: 'Steel' },
  { name: 'Platinum' },
  { name: 'Computer Chips' },
  { name: 'Fuel Cells' },
  { name: 'Alien Artifacts' },
  { name: 'Spice' },
  { name: 'Rare Gems' }
]

const pricingHistoryList = [
  { name: 'No' },
  { name: 'Yes' }
]

</script>

<template>
  <div class="flex flex-column align-items-center justify-content-center text-white">
    <h1 class="py-0 my-3" style="font-size: 2.5rem">Space Station Trading Post</h1>
    <div class="flex w-full mx-auto justify-content-evenly" style="max-width: 800px">
      <div class="w-12rem text-center">  
        <h4>Select a Station</h4>
        <Listbox v-model="selectedName" :options="stationList" optionLabel="name" class="w-full border-round-lg" />
      </div>
      <div class="w-12rem text-center">  
        <h4>Select an Artifact</h4>
        <Listbox v-model="selectedArtifact" :options="artifactList" optionLabel="name" class="w-full border-round-lg" />
      </div>
      <div class="w-12rem text-center">  
        <h4>View Pricing History</h4>
        <Listbox v-model="stationPricingHistory" :options="pricingHistoryList" optionLabel="name" class="w-full border-round-lg" />
      </div>
    </div>
    <Button 
      class="my-4 py-3 px-5 submitBtn border-round-lg" 
      style=""
      label="Submit" 
      :disabled="!selectedName || !selectedArtifact || !stationPricingHistory" 
      @click="getStationData"
    />

    <div>
      <div v-if="stationData && Object.keys(stationData).length" class="flex flex-column align-items-center justify-content-center mt-2 mb-8">
        <Card class="bg-white border-round-lg p-2" style="width: 100%; overflow: hidden; color: var(--mid-space);">
          <template #content>
            <div class="flex">
              <div>
                <div class="w-full h-14rem">
                  <img class="w-25rem h-auto max-h-full pt-2" alt="user header" :src="stationImage" />
                </div>
                <p class="p-0 m-0 pl-3 pt-2 bg-white text-bold" style="font-size: 3rem">{{ stationData.name }}</p>
              </div>
              <div class="flex flex-column">
                <PriceHistoryChart v-if="stationData && Object.keys(stationData).length && showGraph" :stationData="stationData" />
                <p class="m-0 pl-3 bg-white">
                    <span class="font-bold">Artifact Name: </span>
                    {{ stationData.artifacts ? stationData.artifacts[0].name : '' }}
                </p>
                <p class="m-0 pl-3 bg-white">
                    <span class="font-bold">Artifact Current Price: </span>
                    £{{ stationData.artifacts ? stationData.artifacts[0].price : '' }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style>
.p-listbox {
  background-color: var(--lightest-space) !important;
  height: 12rem !important;
  overflow: scroll !important;
}

.p-listbox-option {
  padding: 0.5rem !important;
}

.p-listbox-option-selected {
  background-color: var(--light-space) !important;
  color: white !important;
  padding: 0.5rem !important;
}

.submitBtn {
  background-color: var(--light-space) !important; 
  color: white !important; 
  border-radius: 5px !important; 
  width: 10rem !important; 
  box-shadow: 0 9px #999;
}

.submitBtn:hover {
  background-color: var(--lightest-space) !important;
}

.submitBtn:disabled {
  background-color: var(--mid-space) !important;
  color: grey !important;
  box-shadow: none !important;
}

.submitBtn:active {
  background-color: var(--lightest-space);
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>