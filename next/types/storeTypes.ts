export type tagType = {
	id: number;
	title: string;
};

export type categoryType = {
	id: number;
	title: string;
};

export type imageType = {
	id: number;
	product_id: number;
	image: string;
	is_feature: true;
	created_at: string;
};
export type productType = {
	id: number;
	large_price: string;
	medium_price: string;
	small_price: string;
	title: string;
	created_at: string;
	is_active: boolean;
	is_popular: boolean;
	category: categoryType;
	tags: tagType[];
	product_image: imageType[];
};

export type itemType = {
	id: number;
	product: productType;
	size: string;
	color: string;
	paper_type: string;
	quantity: 2;
	image: imageType[];
	price: string;
};

export type rawItemType = {
	product: number;
	size: string;
	color: string;
	paper_type: string;
	quantity: number;
	image: imageType | string;
};

export type pageData = {
	page: number;
	data: productType[];
};

export type metaType = {
	totalCount: number;
	pageCount: number;
	items_per_page: number;
};

export type cart_info = {
	user: number;
	paid: boolean;
	with_delivery: boolean;
	items_total: number;
	total: number;
};
