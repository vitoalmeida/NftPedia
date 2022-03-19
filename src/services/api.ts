export async function getHotels() {
  // Dynamic import
  const { default: hotelList } = await import('../../public/hotels.json', {
    assert: { type: 'json' },
  });

  return hotelList;
}
