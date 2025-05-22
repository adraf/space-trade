const apiKey = import.meta.env.VITE_API_KEY

export default async function getContent(stationName, stationArtifact, stationPricingHistory) {
  let prepStationName = stationName;
  if (stationName !== '') {
    prepStationName = stationName.split(' ').join('%20').toLowerCase();
  }
  let prepstationArtifact = stationArtifact;
  if (stationArtifact !== '') {
    prepstationArtifact = stationArtifact.split(' ').join('%20').toLowerCase();
  }
  const response = await fetch('https://api.jellyfaas.com/auth-service/v1/validate', {
    headers: {
      'x-jf-apikey': `${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Auth fetch failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json()
  const token = data.token
  const stationData = await getData(token, prepStationName, prepstationArtifact, stationPricingHistory)
  return stationData
}

async function getData(token, name, artifact, history){
  const response = await fetch(`/api/spacestation-cvm2ffq9io6g00dj7vpg-1-s?station=${name}&artifact=${artifact}&historic=${history}`, {
    method: 'GET',
    headers: {
      'jfwt': `${token}`,
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  console.log('getData **', data[0])
  return data[0]
}

