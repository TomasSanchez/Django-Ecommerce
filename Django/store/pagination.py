
def get_response_in_pages(items_per_page, serializer):
    data = []
    page_index = 0
    page_data = []
    for index in range(len(serializer.data)):
        if ((index  % items_per_page == 0) and index != 0) or ():
            data.insert(page_index, {'page':page_index,'data':page_data})
            page_index += 1
            page_data = []
        page_data.append(serializer.data[index])
    data.insert(page_index, {'page':page_index,'data':page_data})        
    response = {'meta': {
        'totalCount': len(serializer.data),
        'pageCount': len(data),
        'items_per_page': items_per_page,
        },
        'data': data}
    return response

# returns data in the way of 
# {
#   meta: { totalCount: 8, pageCount: 2, items_per_page: 6 },
#   data: [ { page: 0, data: [Array] }, { page: 1, data: [Array] } ]
# }