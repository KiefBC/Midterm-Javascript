/**
 * I had a lot of fun doing this Midterm. I hope you enjoy it as much as I did. I spent a lot of time thinking how I wanted to do it. So I went with what I think is a weird design. I decided to try and make a site that built itself based on the users interactions with it.
 * I think it does just that. All the user would see in the HTML is a blank file. But once the website is loaded its filled and fully functional.
 *
 * I also wanted to make it so that the user could interact with the site, so it would change based on the users interactions.
 * I ended up making a bunch of words and generate them together using some basic month to try and get unique names and content. I think the names are quite funny for what they are. No the users faces you see are not real people, they are fake as heck!
 *
 * I learned quite a bit from this. I also learned a bit more about how to interact with Bootstrap using strictly Javascript.
 *
 * I don't know what Ocean Fried Chicken is like, but It makes me feel uneasy. I hope you enjoy the site.
 *
 * I also hate choosing colors. FYI!!!!!!!!
 */

/**
 * This Class is responsible for generating user data.
 */
class UserGenerator {
  constructor() {
    console.log('\nUserGenerator instance created.\n\n');
    this.usersObjArray = []; // Array to hold generated user data
    this.employeeID = 1; // Unique ID for each user (employee1, employee2, etc.)
    this.STAFFCOUNT = 3;
    this.countStaff = 0;

  }

  /**
   * Method to generate a random word
   * @returns {string} - A random word
   */
  generateWord() {
    const words = ["Blorfingle", "Quizzaciously", "Glimboggle", "Frindleplax", "Whompsifer", "Zyxwuvut", "Plumbusque", "Janklefot", "Vexnop", "Grindlewock", "Thwipthwap", "Crumblebuns", "Snerpderp", "Flinglebop", "Quemp", "Lorpzal", "Vlimshard", "Trinklestomp", "Wuzzlefink", "Ploobadoof", "Glempsort", "Froopledox", "Hurpledurp", "Snorklewoggle", "Blampflarf", "Shizle", "Glimp", "Froop", "Talert", "Klogged", "Pinkle", "Hashluck", "Blorg", "Snigglewomp", "Qwompa", "Suhneez", "Boab", "Flobbertop", "Fregit"]
    return words[Math.floor(Math.random() * words.length)];
  }

  /**
   * Method to generate a random email
   * @returns {string} - A random email
   */
  generateEmail() {
    let emailEndingList = ["gestout", "veleodka", "novidnectar", "gwenrog", "temetonic", "kaermorhe", "dimeritiumht"]
    let emailHandle = this.generateWord().toLowerCase();
    let emailEnding = emailEndingList[Math.floor(Math.random() * emailEndingList.length)];
    return `${emailHandle}@${emailEnding}.com`;
  }

  /**
   * Method to generate a random username
   * @returns {string} - A random username
   */
  generateUsername () {
    return this.generateWord().toLowerCase();
  }

  /**
   * Method to generate a random photo from our /static/images folder
   * @returns - A random photo
   */
  randomPhoto() {
    const numberOfPhotos = 14; // For example, if you have 10 photos in your folder
    const photoIndex = Math.floor(Math.random() * numberOfPhotos) + 1; // to get a number between 1 and numberOfPhotos
    return `/static/img/user${photoIndex}.jpg`;
  }

  /**
   * Method to generate a user
   * @returns {{firstName: string, lastName: string, isStaff: boolean, dateOfBirth: string, id: number, userName: string, department: string, email: string, picture: string}} - A user object
   */
  generateUser() {
    return {
    id: this.employeeID++,
    firstName: this.generateWord(),
    lastName: this.generateWord(),
    userName: this.generateUsername(),
    email: this.generateEmail(),
    // A date format that is compatible with the HTML date input
    dateOfBirth: new Date().toISOString().slice(0, 10),
    picture: this.randomPhoto(),
    // 3 staff members
    isStaff: this.countStaff++ < this.STAFFCOUNT,
    department: this.generateWord(),
    };
  }

  /**
   * Method to generate multiple users
   * @param count - The number of users to generate
   */
  generateMultipleUsers(count) {
    for (let i = 0; i < count; i++) {
      const user = this.generateUser();
      // If the user is successfully generated, add it to the array
      if (user) {
        this.usersObjArray.push(user);
      }
    }
  }

  /**
   * Getter to return all users
   * @returns {[]} - An array of user objects
   */
  get allUsers() {
    return this.usersObjArray;
  }
}

/**
 * This Class is responsible for creating a human user.
 * This user will be used to interact with the website.
 */
class HumanUser {
  constructor() {
    console.log('\nHumanUser instance created.\n\n');
    this.isLogged = false;
    this.isStaff = false;
  }
}

/**
 * This Class is responsible for creating a website.
 */
class Website {
  constructor(humanUser, userGenerator) {
    console.log('\nWebsite instance created.\n\n');
    this.bootstrapModal = null;
    this.humanUser = humanUser;
    this.userGenerator = userGenerator;
  }

  /**
   * Method to initialize the basic elements of the website.
   * This includes the navbar, video background, and footer.
   * It also creates a container for the user cards.
   */
  initializeBasicElements() {
    const mainContent = document.getElementById('main-content');
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg');
    navbar.style.backgroundColor = 'rgba(0, 180, 216, 0.5)';

    navbar.innerHTML = `
   <div class="container-fluid">
    <a class="navbar-brand" href="#">Midterm</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
      </ul>
        <button id="navbar-login-button" class="btn" type="submit">Login</button>
    </div>
  </div>
    `;
    // append to top of html
    document.body.prepend(navbar);

    // create a container for the video
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    const videoDiv = document.createElement('div');
    videoDiv.classList.add('video-container');
    videoDiv.innerHTML = `
    <video autoplay loop id="myVideo">
      <source src="static/video/backgroundvid.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    `;

    // append video to the container
    mainContent.appendChild(videoDiv);

    // append container to the main content
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.id = 'card-div';
    containerDiv.appendChild(rowDiv);
    mainContent.appendChild(containerDiv);

    const footer = document.createElement('footer');
    footer.classList.add('bg-dark', 'text-center', 'text-white', 'py-3');
    footer.innerHTML = `
      <div class="container">
        <p class="mx-auto my-auto">Copyright &copy; Kiefer&trade;</p>
      </div>
    `;

    // append footer after main content
    mainContent.parentNode.insertBefore(footer, mainContent.nextSibling);

    const loginModal = document.createElement('div');
    loginModal.classList.add('modal', 'fade');
    loginModal.id = 'login-modal';

    // append after the navbar
    navbar.parentNode.insertBefore(loginModal, navbar.nextSibling);
  }

  /**
   * Method to create a landing page.
   * This is the first page the user sees when they visit the website.
   * It contains a welcome message and a login button.
   */
  createLandingPage() {
    const mainContainer = document.getElementById('main-content');
    const landingPage = document.createElement('div');
    landingPage.classList.add('container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'min-vh-100');
    landingPage.id = 'landing-page';

    landingPage.innerHTML = `
      <div id="" class="landing-page-content text-center animate__animated animate__rubberBand animate__infinite animate__slower">
        <h1 class="display-1">Ocean Fried Chicken<h1>
        <h3>Dive into our ocean of content – it's a shore thing you'll love it!</h3>
      </div>
      <div class="landing-page-content mt-5">
        <p class="lead">Please log in to continue.</p>
        <button id="landing-page-button" type="button" class="btn">Login</button>
      </div>
    `;

    // append to the top of the main content div
    mainContainer.prepend(landingPage);
  }

  /**
   * Method to initialize the website.
   * This includes creating a modal for the login form.
   * It also controls the login button.
   */
  initialize() {
    const modalDialog = document.querySelector('.modal-dialog');

    // Ensure modal is only created once
    if (!modalDialog) {
      this.createLoginModal();
    }

    this.controlLoginButton();
  }

  /**
   * Method to create a login modal.
   * This modal will be used to log in the user.
   * It will also contain a dropdown to select a user.
   */
  createLoginModal() {
    const modal = document.getElementById('login-modal');
    const navbar = document.querySelector('.navbar');

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered animate__animated animate__lightSpeedInRight animate__slow">
            <div class="modal-content card">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="login-user-modal">Login</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="login-form" class="was-validated" novalidate>
                        <div class="mb-3 input-group">
                            <label for="first-name" class="form-label" hidden>Username</label>
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-person-standing" viewBox="0 0 16 16">
                                    <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0"/>
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="first-name" placeholder="Enter your first name..."
                                   required pattern="^[A-Za-z0-9]+$" value="JNelson">
                            <div class="valid-feedback text-center">Valid.</div>
                            <div class="invalid-feedback text-center">Please fill out this field.</div>
                        </div>
                        <div class="mb-3 input-group">
                            <label for="last-name" class="form-label" hidden>Password</label>
                            <span class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-person-walking" viewBox="0 0 16 16">
                                  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
                                  <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
                                </svg>
                            </span>
                            <input type="password" class="form-control" id="last-name" placeholder="Enter your last name..."
                                   required pattern="^[A-Za-z]+$" value="JNelson">
                            <div class="valid-feedback text-center">Valid.</div>
                            <div class="invalid-feedback text-center">Please fill out this field.</div>
                        </div>
                    </form>
                    <div class="d-flex flex-column justify-content-center mb-3" id="login-response">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn modal-buttons" data-bs-dismiss="modal" id="login-submit-button">Submit</button>
                        <button type="button" class="btn modal-buttons" data-bs-dismiss="modal" id="admin-override">Admin Override</button>
                        <button type="button" class="btn modal-buttons" data-bs-dismiss="modal" id="close-modal-button">Close</button>
                        <div>
                        <select id="names-dropdown">
                            <option value="0">Select a User</option>
                        </select>
                          </div>
                    </div>
                </div>
            </div>
        </div>
        `;

    // append after the navbar and before the video (next sibling)
    navbar.parentNode.insertBefore(modal, navbar.nextSibling);
  }

  /**
   * Method to generate a card for a user using their data
   * @param generatedUser - The user to generate a card for
   */
  generateCard(generatedUser) {
    const cardContainer = document.getElementById('card-div');

    let htmlContent = `
        <div class="col-md-4 my-5 mx-auto generated-cards">
          <div class="card shadow-md specific-cards">
            <img src="${generatedUser.picture}" class="card-img-top img-fluid user-image" alt="User Image #${generatedUser.id}">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><h5 class="card-title text-center">${generatedUser.firstName} ${generatedUser.lastName}</h5></li>
                <li class="list-group-item"><p class="card-text"><span class="fw-bold card-user-header">Username:</span> ${generatedUser.userName}</p></li>
                <li class="list-group-item"><p class="card-text"><span class="fw-bold card-user-header">Contact: </span><a href="mailto:${generatedUser.email}">${generatedUser.email}</a></p></li>
                <li class="list-group-item"><p class="card-text"><span class="fw-bold  card-user-header">Date of Birth:</span> ${generatedUser.dateOfBirth}</p></li>
                ${this.humanUser.isStaff ? `<li class="list-group-item is-staff"><p class="card-text is-staff"><span class="fw-bold  card-user-header">Staff Member:</span> <span class="text-decoration-underline fw-bolder">${generatedUser.isStaff ? 'Yes' : 'No'}</span></p></li>` : ''}
                ${generatedUser.isStaff ? `<li class="list-group-item"><p class="card-text"><span class="fw-bold  card-user-header">Department:</span> ${generatedUser.department}</p></li>` : ''}
              </ul>
            </div>
            <div class="staff-button-div mx-auto">
            </div>
          </div>
        </div>
    `;

    // Append the card to the card container
    cardContainer.innerHTML += htmlContent;
  }

  /**
   * Method to add a "Staff" button to the user's card
   * This button will only be added if the user is a staff member
   */
  addStaffButton() {
    const staffButtonDiv = document.querySelectorAll('.staff-button-div');
    let increment = 0; // Increment to give each button a unique ID

    // Add a "Staff" button to each user's card
    for (const staffButton of staffButtonDiv) {
      const button = document.createElement('button');
      button.classList.add('btn', 'staff-button', 'mb-3', 'animate__flash', 'animate__delay-2s', 'animate__slow', 'animate__infinite', 'animate__animated');
      button.textContent = 'Delete User';
      button.id = `staff-button-${increment++}`;
      staffButton.appendChild(button);
    }

    const staffButtons = document.querySelectorAll('.staff-button');
    staffButtons.forEach((staffButton) => {
      staffButton.addEventListener('click', (event) => {
        this.deleteUser(event.target); // target being the button
      });
    });
  }

  /**
   * Method to remove the splash page
   * This will be called when the user logs in
   * It will remove the splash page and animate the user cards
   */
  removeSplashPage() {
    const splashPage = document.getElementById('landing-page');
    splashPage.classList.add('animate__animated', 'animate__fadeOut'); // Animate the splash page removal

    // Remove the splash page after the animation ends
    splashPage.addEventListener('animationend', () => {
      splashPage.remove();

      // Animate the user cards after the splash page is removed
      const elementsToAnimate = document.querySelectorAll('.generated-cards');
      elementsToAnimate.forEach((element) => {
        element.classList.add('animate__animated', 'animate__fadeIn');
      });

      // Remove the animation that used to FadeIn the cards after 1 seconds
      setTimeout(() => {
        elementsToAnimate.forEach((element) => {
          element.classList.remove('animate__fadeIn');
        });
      }, 1000);
    });
  }

  /**
   * Method to delete a user
   * This will be called when the user clicks the "Delete User" button on a user's card
   * @param event - The event that triggered the method, in this case, the button click
   */
  deleteUser(event) {
    // Get the card that the button is on
    const card = event.closest('.generated-cards');

    // If the user is a staff member, they can't delete themselves or other staff members
    if (card.querySelector('.is-staff').textContent.includes('Yes')) {
      alert("You can't delete a staff member.");
    } else {
      card.remove();
    }
  }

  /**
   * Method to control the login button
   * This will change the login button to a logout button if the user is logged in
   * It will also add an event listener to the login button
   */
  controlLoginButton() {
    const navBarButton = document.getElementById('navbar-login-button');
    const parentElement = navBarButton.parentElement;
    const landingPageButton = document.getElementById('landing-page-button');


    // If the user is logged in, change the button to a logout button
    if (this.humanUser.isLogged) {
      const newButton = document.createElement('button');
      newButton.textContent = 'Logout';
      newButton.id = 'navbar-login-button';
      newButton.classList.add('btn');

      newButton.addEventListener('click', () => this.logoutUser());

      /*
      Replace the old button with the new button
      This is a necessary workaround for an issue I had with the button not updating
       */
      parentElement.replaceChild(newButton, navBarButton);
    } else {
      // If the user is not logged in, change the button to a login button
      navBarButton.textContent = 'Login';
      navBarButton.removeEventListener('click', () => this.logoutUser());
      navBarButton.addEventListener('click', () => this.loginUser());
      landingPageButton.addEventListener('click', () => this.loginUser());
    }


  }

  /**
   * Method to log in the user
   * This will be called when the user clicks the login button
   * It will also create user cards and remove the splash page,
   * add a "Staff" button to the user's card if the user is a staff member,
   * and also add a "Refresh Users" button to the navbar if the user is a staff member
   */
  loginUser() {
    this.humanUser.isLogged = true;
    /*
    Create a modal using Bootstrap JavaScript
    https://getbootstrap.com/docs/5.3/getting-started/javascript/
    I kind of like this approach
     */
    this.bootstrapModal = new bootstrap.Modal(document.getElementById('login-modal'));
    this.bootstrapModal.show();

    const form = document.getElementById('login-form');
    const submitButton = document.getElementById('login-submit-button');
    const adminOverride = document.getElementById('admin-override');

    // Create an array of staff IDs
    let staffIDArray = [];
    for (const generatedUser of this.userGenerator.allUsers) {
      if (generatedUser.isStaff) {
        staffIDArray.push(generatedUser.id);
      }
    }

    // if the dropdown value is in the staffIDArray then the user is staff
    let dropdown = document.getElementById('names-dropdown');
    dropdown.addEventListener('change', (event) => {
      this.humanUser.isStaff = staffIDArray.includes(parseInt(event.target.value));
    });

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();

      if (form.checkValidity()) {
        this.humanUser.isLogged = true;
        this.controlLoginButton();
        this.bootstrapModal.hide();

      } else {
        alert('Form is invalid.');
      }

      if (this.humanUser.isStaff) {
        const navbarButton = document.getElementById('navbar-login-button');
        const refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh Users';
        refreshButton.classList.add('btn', 'mx-2');
        refreshButton.id = 'refresh-button';
        navbarButton.parentNode.insertBefore(refreshButton, navbarButton.nextSibling);

        refreshButton.addEventListener('click', () => this.refreshCards());

        // Create a card for each user
        for (const generatedUser of this.userGenerator.allUsers) {
          this.generateCard(generatedUser); // Generates a card for the user// Adds a "Staff" button to the user's card
        }
        this.addStaffButton();
      } else {
        // If the first user is not staff, generate a card for them
        let standardUser = this.userGenerator.allUsers[0];
        if (!standardUser.isStaff) {
          this.generateCard(standardUser);
        } else {
          // If the first user is staff, generate a card for the next user that is not staff
          for (const generatedUser of this.userGenerator.allUsers) {
            if (!generatedUser.isStaff) {
              this.generateCard(generatedUser);
              break;
            }
          }

          // print the staff now
          for (const generatedUser of this.userGenerator.allUsers) {
            if (generatedUser.isStaff) {
              this.generateCard(generatedUser);
            }
          }
        }
      }

      this.removeSplashPage();
      this.controlLoginButton();
    });

    adminOverride.addEventListener('click', () => {
      this.humanUser.isLogged = true;
      this.humanUser.isStaff = true;
      this.bootstrapModal.hide();
      this.controlLoginButton();
      this.removeSplashPage();

      const navbarButton = document.getElementById('navbar-login-button');
      const refreshButton = document.createElement('button');
      refreshButton.textContent = 'Refresh Users';
      refreshButton.classList.add('btn', 'mx-2');
      refreshButton.id = 'refresh-button';
      navbarButton.parentNode.insertBefore(refreshButton, navbarButton.nextSibling);

      refreshButton.addEventListener('click', () => this.refreshCards());

      for (const generatedUser of this.userGenerator.allUsers) {
        this.generateCard(generatedUser);
      }
      this.addStaffButton();
    });

  }

  /**
   * Method to log out the user
   * This will be called when the user clicks the logout button
   * It will then rebuild the website
   */
  logoutUser() {
    // Reset the user's login status
    this.humanUser.isLogged = false;
    this.humanUser.isStaff = false;

    // Remove all content except for the video and the scripts
    document.body.innerHTML = document.body.innerHTML.match(/<(script|video)[^>]*>[\s\S]*?<\/(script|video)>/g).join('');

    this.startBuilding();
  }

  /**
   * Method to start building the website
   * This will be called when the website is first loaded
   * or when the user logs out
   * It will create the landing page, initialize the basic elements,
   */
  startBuilding() {
    const mainContent = document.createElement('div');
    mainContent.setAttribute('id', 'main-content');
    document.body.insertBefore(mainContent, document.body.firstChild);

    this.createLandingPage();
    this.initializeBasicElements();
    this.initialize();

    // Fill the dropdown with the user data
    let generatedUsers = this.userGenerator.allUsers;
    let staffIDArray = [];
    for (const user of generatedUsers) {
      const employeeID = user.id;
      if (user.isStaff) {
        staffIDArray.push(employeeID);
      }
      fillDropdown(employeeID, staffIDArray);
    }
  }

  /**
   * Method to refresh the user cards
   * This will be called when the user clicks the "Refresh Users" button
   */
  refreshCards() {
    const cardDiv = document.getElementById('card-div');
    cardDiv.innerHTML = '';
    for (const generatedUser of this.userGenerator.allUsers) {
      this.generateCard(generatedUser);
    }
    this.addStaffButton();
  }
}

/**
 * This function is responsible for generating the automated building of the website.
 */
const generateAutomation = () => {
  const USER_COUNT = 15;

  const humanUser = new HumanUser();
  const userGenerator = new UserGenerator();
  const website = new Website(humanUser, userGenerator);

  website.startBuilding();
  userGenerator.generateMultipleUsers(USER_COUNT);

  // The initial filling of the dropdown
  let generatedUsers = userGenerator.allUsers;
  let staffIDArray = [];
  for (const user of generatedUsers) {
    const employeeID = user.id;
    // If the user is staff, add their ID to the staffIDArray
    if (user.isStaff) {
      staffIDArray.push(employeeID);
    }
    fillDropdown(employeeID, staffIDArray);
  }
}

/**
 * This function is responsible for filling the dropdown with user data.
 * It also adds an event listener to the dropdown to update the username and password inputs.
 * @param employeeID - The ID of the employee
 * @param staffIDArray - An array of staff IDs
 */
const fillDropdown = (employeeID, staffIDArray) => {
  let dropdown = document.getElementById('names-dropdown');
  let option = document.createElement('option');

  // If the employee is staff, add "Staff" to the dropdown option
  if (staffIDArray.includes(employeeID)) {
    option.text = `Employee ${employeeID} (Staff)`;
  } else {
    option.text = `Employee ${employeeID}`;
  }

  option.value = employeeID;
  dropdown.add(option);

  dropdown.addEventListener('change', (event) => {
    const userNameInput = document.getElementById('first-name');
    const passwordInput = document.getElementById('last-name');
    userNameInput.value = `employee${event.target.value}`;
    passwordInput.value = `password`;
  });
}

// LET THE GAMES BEGIN
generateAutomation();


