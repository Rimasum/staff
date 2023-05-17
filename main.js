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
        <div class="card mb-3 rounded">
        <div class="row justify-content-evenly">
          <div class="col-4">
            <img src="${match.img}" class="card-img img-fluid" alt="userimage">
          </div>
          <div class="col-8">
            <div>
              <h5 class="card-title">${match.name}</h5>
              <p class="card-text">${match.designation}</p>
              <p class="card-text"><small class="text-muted"><a href="tel:${match.mobile}">${match.mobile}</a></small></p>
              <p class="card-text"><a href="mailto:${match.mobile}">${match.email}</a></small></p>
              <div class="row">
            <div class="col-6">
                <p><a href="tel:${match.mobile}" class="btn btn-primary rounded">Call Now</a></p>
            </div>
            <div class="col-6">
                <p><a href="mailto:${match.mobile}" class="btn btn-primary rounded">Send Mail</a></p>
            </div>
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
    matchList.innerHTML = 'Data Not Found';
  }
};
search.addEventListener('input', () => searchStates(search.value));
window.addEventListener('load', () => searchStates(search.value));
