// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Initialize Firebase Services ---
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();

    // --- Get HTML Elements ---
    const logoutButton = document.getElementById('logout-button');
    const userEmailSpan = document.getElementById('user-email');
    const addProductForm = document.getElementById('add-product-form');
    const productsListContainer = document.getElementById('products-list-container');

    // --- 1. AUTHENTICATION GUARD ---
    // Check the user's authentication state
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            console.log('Admin user signed in:', user.email);
            userEmailSpan.textContent = user.email;
            fetchAndDisplayProducts(); // Load products now that we're authenticated
        } else {
            // No user is signed in. Redirect to login page.
            console.log('No user signed in. Redirecting to login.');
            window.location.href = 'login.html'; // Create a login.html page
        }
    });

    // --- 2. LOGOUT FUNCTIONALITY ---
    logoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log('User signed out successfully.');
            // The onAuthStateChanged listener above will automatically handle the redirect.
        }).catch(error => {
            console.error('Sign out error:', error);
        });
    });

    // --- 3. ADD NEW PRODUCT ---
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name = addProductForm.productName.value;
        const price = parseFloat(addProductForm.productPrice.value);
        const description = addProductForm.productDescription.value;
        const imageFile = addProductForm.productImage.files[0];

        if (!imageFile) {
            alert('Please select a product image.');
            return;
        }

        try {
            // Upload image to Firebase Storage
            const storageRef = storage.ref(`product-images/${Date.now()}_${imageFile.name}`);
            const uploadTask = await storageRef.put(imageFile);
            const imageUrl = await uploadTask.ref.getDownloadURL();

            // Add product data to Firestore
            await db.collection('products').add({
                name: name,
                price: price,
                description: description,
                imageUrl: imageUrl,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('Product added successfully!');
            addProductForm.reset();
            fetchAndDisplayProducts(); // Refresh the list

        } catch (error) {
            console.error("Error adding product: ", error);
            alert('Failed to add product. Check the console for details.');
        }
    });

    // --- 4. FETCH AND DISPLAY EXISTING PRODUCTS ---
    async function fetchAndDisplayProducts() {
        productsListContainer.innerHTML = 'Loading products...'; // Show a loading message
        const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
        
        productsListContainer.innerHTML = ''; // Clear container

        if (snapshot.empty) {
            productsListContainer.innerHTML = '<p>No products found.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const product = doc.data();
            const productId = doc.id;

            const productElement = document.createElement('div');
            productElement.classList.add('product-item'); // For CSS styling
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" width="100">
                <div>
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                </div>
                <button class="delete-btn" data-id="${productId}">Delete</button>
            `;
            productsListContainer.appendChild(productElement);
        });
    }

    // --- 5. DELETE PRODUCT ---
    // Use event delegation for delete buttons
    productsListContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const productId = e.target.getAttribute('data-id');

            if (confirm('Are you sure you want to delete this product?')) {
                try {
                    await db.collection('products').doc(productId).delete();
                    alert('Product deleted successfully!');
                    fetchAndDisplayProducts(); // Refresh the list
                } catch (error) {
                    console.error("Error deleting product: ", error);
                    alert('Failed to delete product.');
                }
            }
        }
    });

}); // End of DOMContentLoaded