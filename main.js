const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search Staff Data and Filter
const searchStates = async (searchText) => {
  const res = await fetch('staff.json');
  const states = await res.json();
  //   console.log(states);
  // Get Match Search Text Input
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return (
      state.name.match(regex) ||
      state.designation.match(regex) ||
      state.dept.match(regex) ||
      state.joiningdate.match(regex) ||
      state.dob.match(regex) ||
      state.mobile.match(regex) ||
      state.email.match(regex)
    );
  });
  //   if (searchText.length === 0) {
  //     matches = [];
  //   }
  console.log(matches);
  results(matches);
};

// Show Results in Card List

const results = (matches) => {
  if (matches.length > 0) {
    const result = matches
      .map(
        (match) => `
        <div class="row mb-3">
        <div class="col-md-6 m-auto">
          <div class="card rounded overflow-hidden">
            <div class="row">
              <div class="col-5 col-md-5">
                <img
                  src="${match.img}"
                  class="card-img img-fluid w-100 h-100"
                  alt="raid"
                />
              </div>
              <div class="col-7 col-md-7 ms-0 ps-0">
                <h1 class="fs-5 mt-2 p-0 m-0 text-black mb-1">${match.name}</h1>
                <hr class="p-0 m-0" />
                <p class="p-0 m-0" style="font-size: 14px">${match.designation}</p>
                <p class="p-0 m-0" style="font-size: 14px">
                <i class="fa-solid fa-house-user"></i> ${match.dept}</p>
                <p class="p-0 m-0" style="font-size: 14px"><i class="fa-solid fa-phone"></i> ${match.mobile}</p>
                <p class="p-0 mb-2" style="font-size: 14px"><i class="fa-solid fa-envelope"></i> ${match.email}</p>
                <div class="d-flex justify-content-between pe-2">
                <a
                  href="tel:${match.mobile}"
                  class="btn btn-primary rounded mb-2 p-1"
                  style="font-size: 14px"
                  ><i class="fa-solid fa-phone"></i> Call Now</a
                >
                <a
                  href="mailto:${match.email}"
                  class="btn btn-primary rounded mb-2 p-1"
                  style="font-size: 14px"
                  ><i class="fa-solid fa-envelope"></i> Send Mail</a
                >
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
      )
      .join('');
    matchList.innerHTML = result;
  } else {
    matchList.innerHTML = `
    <div class="row">
      <div class="pt-5">
          <h3 class="text-center">Sorry, Can't Find This Staff!</h1>
      </div>
    </div>
    `;
  }
};
search.addEventListener('input', () => searchStates(search.value));
window.addEventListener('load', () => searchStates(search.value));
