/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { categoryType } from "../types/storeTypes";

type propType = {
	categories: categoryType[] | undefined;
};

const Dropdown = (props: propType) => {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			{({ open }) => (
				<>
					<div>
						<Menu.Button
							className='
                            inline-flex justify-center 
                            px-4 py-2  text-sm font-medium  
                            hover:bg-gray-70 text-gray-600 body-font '>
							Categories
							<ChevronDownIcon
								className='-mr-1 ml-2 h-5 w-5'
								aria-hidden='true'
							/>
						</Menu.Button>
					</div>

					<Transition
						show={open}
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'>
						<Menu.Items
							static
							className='origin-top-right absolute z-auto mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
							style={{ zIndex: 9999999 }}>
							<div className='py-1'>
								{props.categories &&
									props.categories.map(
										(category: categoryType) => (
											<Menu.Item key={category.id}>
												{({ active }) => (
													<a
														href={`/category/${category.id}`}
														className='text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900'>
														{category.title}
													</a>
												)}
											</Menu.Item>
										)
									)}
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};

export default Dropdown;
