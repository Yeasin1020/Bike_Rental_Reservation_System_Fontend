

export interface Comment {
	_id: string;
	text: string;
	user: {
		_id: string;
		name: string;
	};
	createdAt: string;
	replies?: Comment[];
}

export interface Review {
	_id: string;
	user: {
		_id: string;
		name: string;
	};
	rating: number;
	text: string;
	imageUrl?: string;
	createdAt: string;
	updatedAt: string;
	likes?: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	comments?: Comment[];
}

export interface Bike {
	_id: { $oid: string };
	name: string;
	description: string;
	pricePerHour: number;
	isAvailable: boolean;
	brand: string;
	model: string;
	year: number;
	cc?: number;
	color?: string;
	fuelType: string;
	mileage: number;
	transmission: string;
	topSpeed: number;
	imageUrls: string[];
	location: {
		city: string;
		area: string;
		coordinates: {
			lat: number;
			lng: number;
		};
	};
	averageRating: number;
	totalRatings: number;
	features: string[];
	reviews?: Review[];
}
