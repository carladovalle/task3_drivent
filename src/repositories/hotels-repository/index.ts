import { prisma } from "@/config";


async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotel(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  findHotels,
  findRoomsByHotel
};

export default hotelsRepository;
