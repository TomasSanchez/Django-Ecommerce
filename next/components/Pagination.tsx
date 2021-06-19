import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { SyntheticEvent } from "react";

const Pagination = ({ page, setPage, meta }: any) => {
	const highlightedElement =
		"z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium";

	const normalElement =
		"bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";

	const handleInput = (e: any) => {
		setPage(parseInt(e.target.value));
	};

	const getPagination = () => {
		const elements = [];
		for (var index = 0; index < meta.pageCount; index++) {
			if (meta.pageCount > 10) {
				if (index == 3) {
					index = meta.pageCount - 3;

					elements.push(
						<span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
							...{" "}
						</span>
					);
				}
			}
			elements.push(
				<button
					key={index}
					value={index}
					onClick={handleInput}
					className={
						page == index ? highlightedElement : normalElement
					}>
					{index + 1}
				</button>
			);
		}
		return elements;
	};

	return (
		<div>
			<div>
				<div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 absolute w-full bottom-0'>
					<div className='flex-1 flex justify-between sm:hidden'>
						<a
							// onClick={() => setPage(page - 1)}
							className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
							Previous
						</a>
						<a
							// onClick={() => setPage(page + 1)}
							className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
							Next
						</a>
					</div>
					<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
						<div>
							<p className='text-sm text-gray-700'>
								Showing <span className='font-medium'>1</span>{" "}
								to{" "}
								<span className='font-medium'>
									{meta.items_per_page}
								</span>{" "}
								of{" "}
								<span className='font-medium'>
									{meta.totalCount}
								</span>{" "}
								results
							</p>
						</div>
						<div>
							<nav
								className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
								aria-label='Pagination'>
								<button
									disabled={page == 0}
									onClick={() => setPage(page - 1)}
									className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
									<span className='sr-only'>Previous</span>
									<ChevronLeftIcon
										className='h-5 w-5'
										aria-hidden='true'
									/>
								</button>
								{getPagination()}
								<button
									disabled={page == meta.pageCount - 1}
									onClick={() => setPage(page + 1)}
									className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
									<span className='sr-only'>Next</span>
									<ChevronRightIcon
										className='h-5 w-5'
										aria-hidden='true'
									/>
								</button>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pagination;

// 	{/* <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
//     ...
// </span> */}
// {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
