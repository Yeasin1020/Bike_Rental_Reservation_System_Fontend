export interface Bike {
	_id: { $oid: string };
	name: string;
	description: string;
	pricePerHour: number;
	isAvailable: boolean;
	brand: string;
	model: string;
	year: number;
	cc: number;
	color: string;
	fuelType: string;
	mileage: number;
	transmission: string;
	topSpeed: number;
	imageUrls: string[];
	location: {
		city: string;
		area: string;
		coordinates: { lat: number; lng: number };
	};
	averageRating: number;
	totalRatings: number;
	owner: { $oid: string };
	features: string[];
	createdAt: { $date: string };
	updatedAt: { $date: string };
	__v: number;
}
