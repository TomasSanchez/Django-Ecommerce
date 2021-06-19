const MainPosts = ({ posts }: any) => {
	return (
		<div>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-10 mx-auto'>
					<div className='outer flex flex-row flex-wrap -m-4'>
						{posts.data.map((post: any) => (
							<div
								key={post.id}
								className='lg:w-1/4 md:w-1/2 p-4 '
								style={{ width: "33%" }}>
								<a className='block relative h-48 rounded overflow-hidden'>
									<img
										className='object-cover object-center w-full h-full block'
										src='https://dummyimage.com/420x260'
									/>
								</a>
								<div className='mt-4'>
									<h3 className='text-gray-500 text-xs tracking-widest title-font mb-1'>
										{posts.category}
									</h3>
									<h2 className='text-gray-900 title-font text-lg font-medium'>
										{post.title}
									</h2>
									<p className='mt-1'>{post.medium_price}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default MainPosts;
