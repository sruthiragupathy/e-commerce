export const addNewItemToExistingArray = (existingArray,newItem,propertyToBeSetTrue) => (
    [{...newItem,[propertyToBeSetTrue]:true},...existingArray,]
)

export const removeItemFromExistingArray = (existingArray,itemToBeRemoved) => (
    existingArray.filter(item => item.id !== itemToBeRemoved.id)
)