import { notFoundError, paymentRequiredError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === "RESERVED") {
    return(402);
  }

  const hotels = await hotelsRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }

  return hotels;

}

async function listRooms(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === "RESERVED") {
    return(402);
  }

  const rooms = await hotelsRepository.findRoomsByHotel(hotelId);

  if (!rooms) {
    throw notFoundError();
  }

  return rooms;

}

const hotelsService = {
  listHotels,
  listRooms
};

export default hotelsService;