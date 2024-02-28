
const loadPhone = async (searchText='phone' , isShowAll ) =>{
        const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data =await res.json();
        const phones = data.data;
        // console.log(phones);
        displayPhones(phones , isShowAll )
}


const displayPhones = (phones  ,isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container')
    //clear the phoneContainer cards adding a new content
     phoneContainer.textContent= '';

     // display show all button 
    const showAllButton = document.getElementById('show-all-button');
        if(phones.length >12 && !isShowAll){
                showAllButton.classList.remove('hidden');
        }
        else{
            showAllButton.classList.add('hidden');
        }
        // console.log('is show all', isShowAll)
        //display only first 12 phones if not show all 
       if(!isShowAll){
            phones = phones.slice(0,12);
       }

        phones.forEach( phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList= ` card  p-4  bg-gray-100 `;
        phoneCard.innerHTML= ` 
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}') " class="btn btn-primary">Show Details</button>
        `
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false)

}

//show all details
const handleShowDetail = async (id) =>{
    // console.log('clicked show details ', id );
    //single show phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

//show the Phone details
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML=`
            <img src="${phone.image}" alt="">
            <h2>Brand: ${phone.brand}</h2>
            <h1><span>Name:${phone.name}</span></h1>
            <h1><span>${phone?.releaseDate}</span></h1>
            <h1><span>Memory: ${phone?.mainFeatures.memory}</span></h1>
            <h1><span>Display_Size:${phone?.mainFeatures?.displaySize}</span></h1>
            <h1><span>${phone?.mainFeatures?.chipSet}</span></h1>
            <p><span>Storage:${phone?.mainFeatures.storage}</span></p>
            
            <h2></h2>

    `

    //show the modal
    show_Details_modal.showModal();
}

//search Button 
const search =(isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchFiled = document.getElementById('search-filed');
    const  searchText= searchFiled.value;
    searchFiled.textContent = '';
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}


//handle show all 
const handleShowAll = ()=>{
    search(true)
}
loadPhone()