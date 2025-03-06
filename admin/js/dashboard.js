// AI Patrik - Hallintapaneelin toiminnallisuus

document.addEventListener('DOMContentLoaded', function() {
    // Näytetään kirjautuneen käyttäjän nimi
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = sessionStorage.getItem('aipatrik_username') || 'ai_agentti';
    }
    
    // Välilehtien toiminnallisuus
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Poistetaan active-luokka kaikista välilehdistä
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Lisätään active-luokka klikattuun välilehteen
            button.classList.add('active');
            
            // Näytetään valitun välilehden sisältö
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Blogitekstien hallinta
    const blogList = document.getElementById('blogList');
    const blogForm = document.getElementById('blogForm');
    const createBlogForm = document.getElementById('createBlogForm');
    const newBlogBtn = document.getElementById('newBlogBtn');
    const cancelBlogBtn = document.getElementById('cancelBlogBtn');
    const blogFormTitle = document.getElementById('blogFormTitle');
    
    // Arvostelujen hallinta
    const reviewList = document.getElementById('reviewList');
    const reviewForm = document.getElementById('reviewForm');
    const createReviewForm = document.getElementById('createReviewForm');
    const newReviewBtn = document.getElementById('newReviewBtn');
    const cancelReviewBtn = document.getElementById('cancelReviewBtn');
    const reviewFormTitle = document.getElementById('reviewFormTitle');
    
    // Oppaiden hallinta
    const guideList = document.getElementById('guideList');
    const guideForm = document.getElementById('guideForm');
    const createGuideForm = document.getElementById('createGuideForm');
    const newGuideBtn = document.getElementById('newGuideBtn');
    const cancelGuideBtn = document.getElementById('cancelGuideBtn');
    const guideFormTitle = document.getElementById('guideFormTitle');
    
    // Työkalujen hallinta
    const toolList = document.getElementById('toolList');
    const toolForm = document.getElementById('toolForm');
    const createToolForm = document.getElementById('createToolForm');
    const newToolBtn = document.getElementById('newToolBtn');
    const cancelToolBtn = document.getElementById('cancelToolBtn');
    const toolFormTitle = document.getElementById('toolFormTitle');
    
    // Haetaan tallennetut sisällöt localStoragesta
    let blogs = JSON.parse(localStorage.getItem('aipatrik_blogs')) || [];
    let reviews = JSON.parse(localStorage.getItem('aipatrik_reviews')) || [];
    let guides = JSON.parse(localStorage.getItem('aipatrik_guides')) || [];
    let tools = JSON.parse(localStorage.getItem('aipatrik_tools')) || [];
    
    // Näytetään tallennetut sisällöt
    renderBlogs();
    renderReviews();
    renderGuides();
    renderTools();
    
    // Uusi blogiteksti -painikkeen toiminnallisuus
    if (newBlogBtn) {
        newBlogBtn.addEventListener('click', function() {
            blogFormTitle.textContent = 'Uusi blogiteksti';
            createBlogForm.reset();
            document.getElementById('blogId').value = '';
            blogForm.style.display = 'block';
            newBlogBtn.style.display = 'none';
        });
    }
    
    // Peruuta blogiteksti -painikkeen toiminnallisuus
    if (cancelBlogBtn) {
        cancelBlogBtn.addEventListener('click', function() {
            blogForm.style.display = 'none';
            newBlogBtn.style.display = 'block';
        });
    }
    
    // Blogitekstilomakkeen lähetys
    if (createBlogForm) {
        createBlogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const blogId = document.getElementById('blogId').value;
            const title = document.getElementById('blogTitle').value;
            const slug = document.getElementById('blogSlug').value;
            const excerpt = document.getElementById('blogExcerpt').value;
            const content = document.getElementById('blogContent').value;
            const date = new Date().toISOString();
            
            if (blogId) {
                // Päivitetään olemassa oleva blogiteksti
                const index = blogs.findIndex(blog => blog.id === blogId);
                if (index !== -1) {
                    blogs[index] = {
                        ...blogs[index],
                        title,
                        slug,
                        excerpt,
                        content,
                        updated: date
                    };
                }
            } else {
                // Luodaan uusi blogiteksti
                const newBlog = {
                    id: Date.now().toString(),
                    title,
                    slug,
                    excerpt,
                    content,
                    created: date,
                    updated: date
                };
                
                blogs.push(newBlog);
            }
            
            // Tallennetaan blogitekstit localStorageen
            localStorage.setItem('aipatrik_blogs', JSON.stringify(blogs));
            
            // Päivitetään blogitekstilista
            renderBlogs();
            
            // Piilotetaan lomake
            blogForm.style.display = 'none';
            newBlogBtn.style.display = 'block';
            
            // Luodaan HTML-tiedosto blogitekstille käyttäen API:a
            const blog = blogId ? blogs.find(blog => blog.id === blogId) : blogs[blogs.length - 1];
            window.aiPatrikAPIClient.createBlogPost(blog)
                .then(response => {
                    if (response.success) {
                        console.log('Blogiteksti luotu onnistuneesti palvelimelle');
                    }
                })
                .catch(error => {
                    console.error('Virhe blogitekstin luomisessa palvelimelle:', error);
                });
        });
    }
    
    // Uusi arvostelu -painikkeen toiminnallisuus
    if (newReviewBtn) {
        newReviewBtn.addEventListener('click', function() {
            reviewFormTitle.textContent = 'Uusi arvostelu';
            createReviewForm.reset();
            document.getElementById('reviewId').value = '';
            reviewForm.style.display = 'block';
            newReviewBtn.style.display = 'none';
        });
    }
    
    // Peruuta arvostelu -painikkeen toiminnallisuus
    if (cancelReviewBtn) {
        cancelReviewBtn.addEventListener('click', function() {
            reviewForm.style.display = 'none';
            newReviewBtn.style.display = 'block';
        });
    }
    
    // Arvostelulomakkeen lähetys
    if (createReviewForm) {
        createReviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reviewId = document.getElementById('reviewId').value;
            const title = document.getElementById('reviewTitle').value;
            const slug = document.getElementById('reviewSlug').value;
            const rating = document.getElementById('reviewRating').value;
            const excerpt = document.getElementById('reviewExcerpt').value;
            const content = document.getElementById('reviewContent').value;
            const date = new Date().toISOString();
            
            if (reviewId) {
                // Päivitetään olemassa oleva arvostelu
                const index = reviews.findIndex(review => review.id === reviewId);
                if (index !== -1) {
                    reviews[index] = {
                        ...reviews[index],
                        title,
                        slug,
                        rating,
                        excerpt,
                        content,
                        updated: date
                    };
                }
            } else {
                // Luodaan uusi arvostelu
                const newReview = {
                    id: Date.now().toString(),
                    title,
                    slug,
                    rating,
                    excerpt,
                    content,
                    created: date,
                    updated: date
                };
                
                reviews.push(newReview);
            }
            
            // Tallennetaan arvostelut localStorageen
            localStorage.setItem('aipatrik_reviews', JSON.stringify(reviews));
            
            // Päivitetään arvostelulista
            renderReviews();
            
            // Piilotetaan lomake
            reviewForm.style.display = 'none';
            newReviewBtn.style.display = 'block';
            
            // Luodaan HTML-tiedosto arvostelulle käyttäen API:a
            const review = reviewId ? reviews.find(review => review.id === reviewId) : reviews[reviews.length - 1];
            window.aiPatrikAPIClient.createReview(review)
                .then(response => {
                    if (response.success) {
                        console.log('Arvostelu luotu onnistuneesti palvelimelle');
                    }
                })
                .catch(error => {
                    console.error('Virhe arvostelun luomisessa palvelimelle:', error);
                });
        });
    }
    
    // Uusi opas -painikkeen toiminnallisuus
    if (newGuideBtn) {
        newGuideBtn.addEventListener('click', function() {
            guideFormTitle.textContent = 'Uusi opas';
            createGuideForm.reset();
            document.getElementById('guideId').value = '';
            guideForm.style.display = 'block';
            newGuideBtn.style.display = 'none';
        });
    }
    
    // Peruuta opas -painikkeen toiminnallisuus
    if (cancelGuideBtn) {
        cancelGuideBtn.addEventListener('click', function() {
            guideForm.style.display = 'none';
            newGuideBtn.style.display = 'block';
        });
    }
    
    // Opaslomakkeen lähetys
    if (createGuideForm) {
        createGuideForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const guideId = document.getElementById('guideId').value;
            const title = document.getElementById('guideTitle').value;
            const slug = document.getElementById('guideSlug').value;
            const excerpt = document.getElementById('guideExcerpt').value;
            const content = document.getElementById('guideContent').value;
            const date = new Date().toISOString();
            
            if (guideId) {
                // Päivitetään olemassa oleva opas
                const index = guides.findIndex(guide => guide.id === guideId);
                if (index !== -1) {
                    guides[index] = {
                        ...guides[index],
                        title,
                        slug,
                        excerpt,
                        content,
                        updated: date
                    };
                }
            } else {
                // Luodaan uusi opas
                const newGuide = {
                    id: Date.now().toString(),
                    title,
                    slug,
                    excerpt,
                    content,
                    created: date,
                    updated: date
                };
                
                guides.push(newGuide);
            }
            
            // Tallennetaan oppaat localStorageen
            localStorage.setItem('aipatrik_guides', JSON.stringify(guides));
            
            // Päivitetään opaslista
            renderGuides();
            
            // Piilotetaan lomake
            guideForm.style.display = 'none';
            newGuideBtn.style.display = 'block';
            
            // Luodaan HTML-tiedosto oppaalle käyttäen API:a
            const guide = guideId ? guides.find(guide => guide.id === guideId) : guides[guides.length - 1];
            window.aiPatrikAPIClient.createGuide(guide)
                .then(response => {
                    if (response.success) {
                        console.log('Opas luotu onnistuneesti palvelimelle');
                    }
                })
                .catch(error => {
                    console.error('Virhe oppaan luomisessa palvelimelle:', error);
                });
        });
    }
    
    // Uusi työkalu -painikkeen toiminnallisuus
    if (newToolBtn) {
        newToolBtn.addEventListener('click', function() {
            toolFormTitle.textContent = 'Uusi työkalu';
            createToolForm.reset();
            document.getElementById('toolId').value = '';
            toolForm.style.display = 'block';
            newToolBtn.style.display = 'none';
        });
    }
    
    // Peruuta työkalu -painikkeen toiminnallisuus
    if (cancelToolBtn) {
        cancelToolBtn.addEventListener('click', function() {
            toolForm.style.display = 'none';
            newToolBtn.style.display = 'block';
        });
    }
    
    // Työkalulomakkeen lähetys
    if (createToolForm) {
        createToolForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const toolId = document.getElementById('toolId').value;
            const title = document.getElementById('toolTitle').value;
            const slug = document.getElementById('toolSlug').value;
            const category = document.getElementById('toolCategory').value;
            const rating = document.getElementById('toolRating').value;
            const url = document.getElementById('toolUrl').value;
            const excerpt = document.getElementById('toolExcerpt').value;
            const content = document.getElementById('toolContent').value;
            const pricing = document.getElementById('toolPricing').value;
            const date = new Date().toISOString();
            
            if (toolId) {
                // Päivitetään olemassa oleva työkalu
                const index = tools.findIndex(tool => tool.id === toolId);
                if (index !== -1) {
                    tools[index] = {
                        ...tools[index],
                        title,
                        slug,
                        category,
                        rating,
                        url,
                        excerpt,
                        content,
                        pricing,
                        updated: date
                    };
                }
            } else {
                // Luodaan uusi työkalu
                const newTool = {
                    id: Date.now().toString(),
                    title,
                    slug,
                    category,
                    rating,
                    url,
                    excerpt,
                    content,
                    pricing,
                    created: date,
                    updated: date
                };
                
                tools.push(newTool);
            }
            
            // Tallennetaan työkalut localStorageen
            localStorage.setItem('aipatrik_tools', JSON.stringify(tools));
            
            // Päivitetään työkalulista
            renderTools();
            
            // Piilotetaan lomake
            toolForm.style.display = 'none';
            newToolBtn.style.display = 'block';
            
            // Luodaan HTML-tiedosto työkalulle käyttäen API:a
            const tool = toolId ? tools.find(tool => tool.id === toolId) : tools[tools.length - 1];
            window.aiPatrikAPIClient.createTool(tool)
                .then(response => {
                    if (response.success) {
                        console.log('Työkalu luotu onnistuneesti palvelimelle');
                    }
                })
                .catch(error => {
                    console.error('Virhe työkalun luomisessa palvelimelle:', error);
                });
        });
    }
    
    // Näytetään blogitekstit
    function renderBlogs() {
        if (!blogList) return;
        
        blogList.innerHTML = '';
        
        if (blogs.length === 0) {
            blogList.innerHTML = '<p>Ei blogitekstejä.</p>';
            return;
        }
        
        blogs.forEach(blog => {
            const blogItem = document.createElement('div');
            blogItem.className = 'content-item';
            
            const created = new Date(blog.created).toLocaleDateString('fi-FI');
            const updated = new Date(blog.updated).toLocaleDateString('fi-FI');
            
            blogItem.innerHTML = `
                <div class="item-header">
                    <h4 class="item-title">${blog.title}</h4>
                    <span class="item-date">Luotu: ${created}</span>
                </div>
                <p>${blog.excerpt}</p>
                <div class="item-actions">
                    <button class="view" data-id="${blog.id}"><i class="fas fa-eye"></i> Näytä</button>
                    <button class="edit" data-id="${blog.id}"><i class="fas fa-edit"></i> Muokkaa</button>
                    <button class="delete" data-id="${blog.id}"><i class="fas fa-trash"></i> Poista</button>
                </div>
            `;
            
            blogList.appendChild(blogItem);
            
            // Lisätään toiminnallisuus painikkeille
            const viewBtn = blogItem.querySelector('.view');
            const editBtn = blogItem.querySelector('.edit');
            const deleteBtn = blogItem.querySelector('.delete');
            
            viewBtn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                const blog = blogs.find(b => b.id === blogId);
                if (blog) {
                    window.open(`../pages/blogi/${blog.slug}.html`, '_blank');
                }
            });
            
            editBtn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                const blog = blogs.find(b => b.id === blogId);
                if (blog) {
                    document.getElementById('blogId').value = blog.id;
                    document.getElementById('blogTitle').value = blog.title;
                    document.getElementById('blogSlug').value = blog.slug;
                    document.getElementById('blogExcerpt').value = blog.excerpt;
                    document.getElementById('blogContent').value = blog.content;
                    
                    blogFormTitle.textContent = 'Muokkaa blogitekstiä';
                    blogForm.style.display = 'block';
                    newBlogBtn.style.display = 'none';
                }
            });
            
            deleteBtn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                if (confirm('Haluatko varmasti poistaa tämän blogitekstin?')) {
                    const blog = blogs.find(b => b.id === blogId);
                    if (blog) {
                        window.aiPatrikAPIClient.deleteContent('blog', blog.slug)
                            .then(response => {
                                if (response.success) {
                                    console.log('Blogiteksti poistettu onnistuneesti palvelimelta');
                                }
                            })
                            .catch(error => {
                                console.error('Virhe blogitekstin poistamisessa palvelimelta:', error);
                            });
                    }
                    
                    blogs = blogs.filter(b => b.id !== blogId);
                    localStorage.setItem('aipatrik_blogs', JSON.stringify(blogs));
                    renderBlogs();
                }
            });
        });
    }
    
    // Näytetään arvostelut
    function renderReviews() {
        if (!reviewList) return;
        
        reviewList.innerHTML = '';
        
        if (reviews.length === 0) {
            reviewList.innerHTML = '<p>Ei arvosteluja.</p>';
            return;
        }
        
        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'content-item';
            
            const created = new Date(review.created).toLocaleDateString('fi-FI');
            const updated = new Date(review.updated).toLocaleDateString('fi-FI');
            
            // Luodaan tähtimerkintä arvosanalle
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    stars += '<i class="fas fa-star"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            reviewItem.innerHTML = `
                <div class="item-header">
                    <h4 class="item-title">${review.title}</h4>
                    <span class="item-date">Luotu: ${created}</span>
                </div>
                <div style="color: #ffc107; margin-bottom: 10px;">${stars} (${review.rating}/5)</div>
                <p>${review.excerpt}</p>
                <div class="item-actions">
                    <button class="view" data-id="${review.id}"><i class="fas fa-eye"></i> Näytä</button>
                    <button class="edit" data-id="${review.id}"><i class="fas fa-edit"></i> Muokkaa</button>
                    <button class="delete" data-id="${review.id}"><i class="fas fa-trash"></i> Poista</button>
                </div>
            `;
            
            reviewList.appendChild(reviewItem);
            
            // Lisätään toiminnallisuus painikkeille
            const viewBtn = reviewItem.querySelector('.view');
            const editBtn = reviewItem.querySelector('.edit');
            const deleteBtn = reviewItem.querySelector('.delete');
            
            viewBtn.addEventListener('click', function() {
                const reviewId = this.getAttribute('data-id');
                const review = reviews.find(r => r.id === reviewId);
                if (review) {
                    window.open(`../pages/arvostelut/${review.slug}.html`, '_blank');
                }
            });
            
            editBtn.addEventListener('click', function() {
                const reviewId = this.getAttribute('data-id');
                const review = reviews.find(r => r.id === reviewId);
                if (review) {
                    document.getElementById('reviewId').value = review.id;
                    document.getElementById('reviewTitle').value = review.title;
                    document.getElementById('reviewSlug').value = review.slug;
                    document.getElementById('reviewRating').value = review.rating;
                    document.getElementById('reviewExcerpt').value = review.excerpt;
                    document.getElementById('reviewContent').value = review.content;
                    
                    reviewFormTitle.textContent = 'Muokkaa arvostelua';
                    reviewForm.style.display = 'block';
                    newReviewBtn.style.display = 'none';
                }
            });
            
            deleteBtn.addEventListener('click', function() {
                const reviewId = this.getAttribute('data-id');
                if (confirm('Haluatko varmasti poistaa tämän arvostelun?')) {
                    const review = reviews.find(r => r.id === reviewId);
                    if (review) {
                        window.aiPatrikAPIClient.deleteContent('review', review.slug)
                            .then(response => {
                                if (response.success) {
                                    console.log('Arvostelu poistettu onnistuneesti palvelimelta');
                                }
                            })
                            .catch(error => {
                                console.error('Virhe arvostelun poistamisessa palvelimelta:', error);
                            });
                    }
                    
                    reviews = reviews.filter(r => r.id !== reviewId);
                    localStorage.setItem('aipatrik_reviews', JSON.stringify(reviews));
                    renderReviews();
                }
            });
        });
    }
    
    // Näytetään oppaat
    function renderGuides() {
        if (!guideList) return;
        
        guideList.innerHTML = '';
        
        if (guides.length === 0) {
            guideList.innerHTML = '<p>Ei oppaita.</p>';
            return;
        }
        
        guides.forEach(guide => {
            const guideItem = document.createElement('div');
            guideItem.className = 'content-item';
            
            const created = new Date(guide.created).toLocaleDateString('fi-FI');
            const updated = new Date(guide.updated).toLocaleDateString('fi-FI');
            
            guideItem.innerHTML = `
                <div class="item-header">
                    <h4 class="item-title">${guide.title}</h4>
                    <span class="item-date">Luotu: ${created}</span>
                </div>
                <p>${guide.excerpt}</p>
                <div class="item-actions">
                    <button class="view" data-id="${guide.id}"><i class="fas fa-eye"></i> Näytä</button>
                    <button class="edit" data-id="${guide.id}"><i class="fas fa-edit"></i> Muokkaa</button>
                    <button class="delete" data-id="${guide.id}"><i class="fas fa-trash"></i> Poista</button>
                </div>
            `;
            
            guideList.appendChild(guideItem);
            
            // Lisätään toiminnallisuus painikkeille
            const viewBtn = guideItem.querySelector('.view');
            const editBtn = guideItem.querySelector('.edit');
            const deleteBtn = guideItem.querySelector('.delete');
            
            viewBtn.addEventListener('click', function() {
                const guideId = this.getAttribute('data-id');
                const guide = guides.find(g => g.id === guideId);
                if (guide) {
                    window.open(`../pages/oppaat/${guide.slug}.html`, '_blank');
                }
            });
            
            editBtn.addEventListener('click', function() {
                const guideId = this.getAttribute('data-id');
                const guide = guides.find(g => g.id === guideId);
                if (guide) {
                    document.getElementById('guideId').value = guide.id;
                    document.getElementById('guideTitle').value = guide.title;
                    document.getElementById('guideSlug').value = guide.slug;
                    document.getElementById('guideExcerpt').value = guide.excerpt;
                    document.getElementById('guideContent').value = guide.content;
                    
                    guideFormTitle.textContent = 'Muokkaa opasta';
                    guideForm.style.display = 'block';
                    newGuideBtn.style.display = 'none';
                }
            });
            
            deleteBtn.addEventListener('click', function() {
                const guideId = this.getAttribute('data-id');
                if (confirm('Haluatko varmasti poistaa tämän oppaan?')) {
                    const guide = guides.find(g => g.id === guideId);
                    if (guide) {
                        window.aiPatrikAPIClient.deleteContent('guide', guide.slug)
                            .then(response => {
                                if (response.success) {
                                    console.log('Opas poistettu onnistuneesti palvelimelta');
                                }
                            })
                            .catch(error => {
                                console.error('Virhe oppaan poistamisessa palvelimelta:', error);
                            });
                    }
                    
                    guides = guides.filter(g => g.id !== guideId);
                    localStorage.setItem('aipatrik_guides', JSON.stringify(guides));
                    renderGuides();
                }
            });
        });
    }
    
    // Näytetään työkalut
    function renderTools() {
        if (!toolList) return;
        
        toolList.innerHTML = '';
        
        if (tools.length === 0) {
            toolList.innerHTML = '<p>Ei työkaluja.</p>';
            return;
        }
        
        tools.forEach(tool => {
            const toolItem = document.createElement('div');
            toolItem.className = 'content-item';
            
            const created = new Date(tool.created).toLocaleDateString('fi-FI');
            const updated = new Date(tool.updated).toLocaleDateString('fi-FI');
            
            // Luodaan tähtimerkintä arvosanalle
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= tool.rating) {
                    stars += '<i class="fas fa-star"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            // Kategoria-ikoni
            let categoryIcon = '';
            switch (tool.category) {
                case 'tekstintuotanto':
                    categoryIcon = '<i class="fas fa-font"></i>';
                    break;
                case 'kuvankasittely':
                    categoryIcon = '<i class="fas fa-image"></i>';
                    break;
                case 'aanenkasittely':
                    categoryIcon = '<i class="fas fa-volume-up"></i>';
                    break;
                case 'videot':
                    categoryIcon = '<i class="fas fa-video"></i>';
                    break;
                case 'ohjelmointi':
                    categoryIcon = '<i class="fas fa-code"></i>';
                    break;
                default:
                    categoryIcon = '<i class="fas fa-cog"></i>';
            }
            
            // Hinnoittelu-badge
            let pricingBadge = '';
            switch (tool.pricing) {
                case 'ilmainen':
                    pricingBadge = '<span class="badge free">Ilmainen</span>';
                    break;
                case 'freemium':
                    pricingBadge = '<span class="badge freemium">Freemium</span>';
                    break;
                case 'maksullinen':
                    pricingBadge = '<span class="badge paid">Maksullinen</span>';
                    break;
                case 'kokeilu':
                    pricingBadge = '<span class="badge trial">Kokeilu</span>';
                    break;
            }
            
            toolItem.innerHTML = `
                <div class="item-header">
                    <h4 class="item-title">${categoryIcon} ${tool.title} ${pricingBadge}</h4>
                    <span class="item-date">Luotu: ${created}</span>
                </div>
                <div style="color: #ffc107; margin-bottom: 10px;">${stars} (${tool.rating}/5)</div>
                <p>${tool.excerpt}</p>
                <div class="item-actions">
                    <a href="${tool.url}" target="_blank" class="tool-link"><i class="fas fa-external-link-alt"></i> Avaa työkalu</a>
                    <button class="view" data-id="${tool.id}"><i class="fas fa-eye"></i> Näytä</button>
                    <button class="edit" data-id="${tool.id}"><i class="fas fa-edit"></i> Muokkaa</button>
                    <button class="delete" data-id="${tool.id}"><i class="fas fa-trash"></i> Poista</button>
                </div>
            `;
            
            toolList.appendChild(toolItem);
            
            // Lisätään toiminnallisuus painikkeille
            const viewBtn = toolItem.querySelector('.view');
            const editBtn = toolItem.querySelector('.edit');
            const deleteBtn = toolItem.querySelector('.delete');
            
            viewBtn.addEventListener('click', function() {
                const toolId = this.getAttribute('data-id');
                const tool = tools.find(t => t.id === toolId);
                if (tool) {
                    window.open(`../pages/tyokalut/${tool.slug}.html`, '_blank');
                }
            });
            
            editBtn.addEventListener('click', function() {
                const toolId = this.getAttribute('data-id');
                const tool = tools.find(t => t.id === toolId);
                if (tool) {
                    document.getElementById('toolId').value = tool.id;
                    document.getElementById('toolTitle').value = tool.title;
                    document.getElementById('toolSlug').value = tool.slug;
                    document.getElementById('toolCategory').value = tool.category;
                    document.getElementById('toolRating').value = tool.rating;
                    document.getElementById('toolUrl').value = tool.url;
                    document.getElementById('toolExcerpt').value = tool.excerpt;
                    document.getElementById('toolContent').value = tool.content;
                    document.getElementById('toolPricing').value = tool.pricing;
                    
                    toolFormTitle.textContent = 'Muokkaa työkalua';
                    toolForm.style.display = 'block';
                    newToolBtn.style.display = 'none';
                }
            });
            
            deleteBtn.addEventListener('click', function() {
                const toolId = this.getAttribute('data-id');
                if (confirm('Haluatko varmasti poistaa tämän työkalun?')) {
                    const tool = tools.find(t => t.id === toolId);
                    if (tool) {
                        window.aiPatrikAPIClient.deleteContent('tool', tool.slug)
                            .then(response => {
                                if (response.success) {
                                    console.log('Työkalu poistettu onnistuneesti palvelimelta');
                                }
                            })
                            .catch(error => {
                                console.error('Virhe työkalun poistamisessa palvelimelta:', error);
                            });
                    }
                    
                    tools = tools.filter(t => t.id !== toolId);
                    localStorage.setItem('aipatrik_tools', JSON.stringify(tools));
                    renderTools();
                }
            });
        });
    }
}); 