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
        <div class="card mb-3 rounded d-flex justify-content-center align-content-center">
        <div class="row">
          <div class="col-4">
            <img src="${match.img}" class="card-img img-fluid" alt="userimage">
          </div>
          <div class="col-8">
            <div>
              <h5 class="card-title">${match.name}</h5>
              <p class="card-text">${match.designation}</p>
              <p class="card-text">${match.mobile}</p>
              <p class="card-text">${match.email}</p>
              <div class="row">
              <div class="col-6">
              <p><a href="tel:${match.mobile}" class="btn btn-primary rounded">Call Now</a></p>
          </div>
          <div class="col-6">
              <p><a href="mailto:${match.email}" class="btn btn-primary rounded">Send Mail</a></p>
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
      <div>
          <h1 class="text-center">Data Not Found!</h1>
      </div>
    </div>
    `;
  }
};
search.addEventListener('input', () => searchStates(search.value));
window.addEventListener('load', () => searchStates(search.value));
