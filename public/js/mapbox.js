// const locations = JSON.parse(document.getElementById('map').dataset.locations);

const data = async () =>

{
    const tours = await fetch('/api/v1/tours/');

    let tour1 = await tours.json()

    tour1 = await tour1.data.data[0]

    // console.log(tour1.name)
}

data();

// console.log(locations);