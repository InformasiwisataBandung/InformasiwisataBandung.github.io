const updateDataFunction = async (data) => {
    try {
        const response = await fetch('https://asia-southeast2-bustling-walker-340203.cloudfunctions.net/function-8UpdateWisata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Check if the expected result structure is present
        if (result && result.message === "Data updated successfully") {
            console.log('Update result:', result);
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error updating data:', error);
        throw error; // Re-throw the error for the calling function to catch
    }
};
