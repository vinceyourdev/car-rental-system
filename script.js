// Vehicle pricing data — ALL 15 vehicles
const vehiclePricing = {
  vios: { name: "Toyota Vios", price: 1500 },
  "honda-city": { name: "Honda City", price: 2000 },
  "innova-zenix": { name: "Toyota Innova Zenix", price: 3500 },
  fortuner: { name: "Toyota Fortuner", price: 5700 },
  xpander: { name: "Mitsubishi Xpander", price: 2800 },
  hilux: { name: "Toyota Hilux Pickup", price: 3000 },
  "isuzu-traviz": { name: "Isuzu Traviz Cargo Truck", price: 4500 },
  "toyota-coaster": { name: "Toyota Coaster Mini Bus", price: 3500 },
  "nissan-urvan": { name: "Nissan Urvan", price: 3580 },
  "corolla-cross-hev": { name: "Toyota Corolla Cross HEV", price: 3500 },
  "modern-puv": { name: "Modern PUV Jeepney", price: 3899 },
  "honda-click-160": { name: "Honda Click 160", price: 500 },
  "yamaha-aerox-155": { name: "Yamaha Aerox 155", price: 800 },
  "honda-adv-160": { name: "Honda ADV 160", price: 1000 },
  "honda-beat": { name: "Honda Beat", price: 500 }
};

// Get selected car from URL
function getSelectedCar() {
  const params = new URLSearchParams(window.location.search);
  const carId = params.get('car') || 'vios';
  return vehiclePricing[carId] || vehiclePricing.vios;
}

// Populate booking page
if (document.getElementById('selected-car')) {
  const car = getSelectedCar();
  document.getElementById('selected-car').textContent = car.name;
  document.getElementById('daily-rate').textContent = `₱${car.price.toLocaleString()}`;
  
  // Calculate total when dates change
  const pickupInput = document.getElementById('pickup');
  const returnInput = document.getElementById('return');
  const totalCostElement = document.getElementById('total-cost');

  function calculateTotal() {
    const pickupDate = new Date(pickupInput.value);
    const returnDate = new Date(returnInput.value);

    if (isNaN(pickupDate.getTime()) || isNaN(returnDate.getTime())) {
      totalCostElement.textContent = "₱0";
      return;
    }

    if (returnDate < pickupDate) {
      totalCostElement.textContent = "Invalid dates";
      return;
    }

    // Calculate number of days
    const timeDiff = returnDate - pickupDate;
    const days = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    const total = days * car.price;

    totalCostElement.textContent = `₱${total.toLocaleString()}`;
  }

  // Attach event listeners
  pickupInput.addEventListener('change', calculateTotal);
  returnInput.addEventListener('change', calculateTotal);

  // Initial calculation
  calculateTotal();
}