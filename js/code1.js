const populateFormForEdit = async () => {
    const data = await fetchDataForEdit(postName);

    if (data && data.data) {
        // ... your existing code
    } else {
        console.error(`Data not found for postName: ${postName}`);
    }
};
