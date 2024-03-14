/**
 * This Class is responsible for generating user data using the Random User Generator API.
 */
class UserGenerator {
  //TODO: Change from API to a local JSON file?
  // Or create an Array first/last name and use Math.random() to generate a name?
  constructor() {
    console.log('\nUserGenerator instance created.\n\n');
    this.usersObjArray = []; // Array to hold generated user data
    this.employeeID = 1; // Unique ID for each user (employee1, employee2, etc.)
    this.STAFFCOUNT = 3; // Number of staff members
    this.countStaff = 0; // Counter for staff members

  }

  generateWord() {
    const words = ["Blorfingle", "Quizzaciously", "Glimboggle", "Frindleplax", "Whompsifer", "Zyxwuvut", "Plumbusque", "Janklefot", "Vexnop", "Grindlewock", "Thwipthwap", "Crumblebuns", "Snerpderp", "Flinglebop", "Quemp", "Lorpzal", "Vlimshard", "Trinklestomp", "Wuzzlefink", "Ploobadoof", "Glempsort", "Froopledox", "Hurpledurp", "Snorklewoggle", "Blampflarf"]
    return words[Math.floor(Math.random() * words.length)];

  }

  generateEmail() {
    let emailEndingList = ["gestout", "veleodka", "novidnectar", "gwenrog", "temetonic", "kaermorhe", "dimeritiumht",]
    let emailHandle = this.generateWord().toLowerCase();
    let emailEnding = emailEndingList[Math.floor(Math.random() * emailEndingList.length)];
    return `${emailHandle}@${emailEnding}.com`;
  }

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
    return `/static/img/user${photoIndex}.jpg`; // Adjust the path as per your project structure
  }

  /**
   * Method to generate a single user
   * @returns - A user object
   */
  generateUser() {
    return {
    id: this.employeeID++,
    firstName: this.generateWord(),
    lastName: this.generateWord(),
    userName: this.generateUsername(),
    email: this.generateEmail(),
    dateOfBirth: new Date().toISOString().slice(0, 10),
    picture: this.randomPhoto(),
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
      if (user) this.usersObjArray.push(user);
    }
  }

  /**
   * Getter method to return all users
   * @returns - An array of user objects
   */
  get allUsers() {
    return this.usersObjArray;
  }
}

/**
 * This Class is responsible for registering and logging in real users.
 */
class HumanUser {
  constructor() {
    console.log('\nHumanUser instance created.\n\n');
    this.isLogged = false;
    this.isStaff = false;
    this.userName = null;
    this.password = null;
  }

  /**
   * Confirms that the user has been logged in
   * @returns - True if the user is logged in, false otherwise
   */
  get LoggedInStatus() {
    return this.isLogged;
  }

  /**
   * Confirms that the user is a staff member
   * @returns - True if the user is a staff member, false otherwise
   */
  get isStaffMember() {
    return this.isStaff;
  }
}

/**
 * This Class is responsible for creating a website.
 */
class Website {
  constructor(humanUser, userGenerator) {
    console.log('\nWebsite instance created.\n\n');
    this.htmlContent = '';
    this.bootstrapModal = null;
    this.humanUser = humanUser;
    this.userGenerator = userGenerator;
  }

  /**
   * Method to initialize the basic elements of the website
   */
  initializeBasicElements() {
    const mainContent = document.getElementById('main-content');
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'bg-dark');
    navbar.setAttribute('data-bs-theme', 'dark');

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
        <button id="navbar-login-button" class="btn btn-outline-success" type="submit">Login</button>
    </div>
  </div>
    `;

    document.body.prepend(navbar);

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.id = 'card-div';
    containerDiv.appendChild(rowDiv);
    const cardCarousel = document.createElement('div');
    cardCarousel.classList.add('card-carousel');
    mainContent.appendChild(containerDiv);

    containerDiv.innerHTML

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
    loginModal.setAttribute('tabindex', '-1');
    loginModal.setAttribute('aria-labelledby', 'login-user-modal');
    loginModal.setAttribute('aria-hidden', 'true');

    // append after the navbar
    navbar.parentNode.insertBefore(loginModal, navbar.nextSibling);
  }

  /**
   * This is the first thing the user sees when they visit the website.
   * A modal will pop up and ask the user to log in.
   */
  createLandingPage() {
    const mainContainer = document.getElementById('main-content');
    const landingPage = document.createElement('div');
    landingPage.classList.add('container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'min-vh-100');
    landingPage.id = 'landing-page';
    landingPage.innerHTML = `
      <h1 class="display-1">Welcome to our website!</h1>
<!--      <button id="splash-page-login-button" class="btn btn-primary">Login</button>-->
    `;

    mainContainer.prepend(landingPage);
  }

  /**
   * Method to initialize the login process.
   * It creates a modal and listens for a click event on the login button.
   */
  initialize() {
    const modalDialog = document.querySelector('.modal-dialog');

    this.controlLoginButton();

    // Ensure modal is only created once
    if (!modalDialog) {
      this.createLoginModal();
    }
  }

  /**
   * Method to create a modal.
   * That is, a form for user to login.
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
                                   required pattern="^[A-Za-z]+$" value="JNelson">
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
                            <input type="text" class="form-control" id="last-name" placeholder="Enter your last name..."
                                   required pattern="^[A-Za-z]+$" value="JNelson">
                            <div class="valid-feedback text-center">Valid.</div>
                            <div class="invalid-feedback text-center">Please fill out this field.</div>
                        </div>
                    </form>
                    <div class="d-flex flex-column justify-content-center mb-3" id="login-response">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="login-submit-button">Submit</button>
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" id="admin-override">Admin Override</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-modal-button">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;

    navbar.parentNode.insertBefore(modal, navbar.nextSibling);
  }

  /**
   * Method to generate a user card
   * @param generatedUser - A user object
   */
  generateCard(generatedUser) {
    const cardContainer = document.getElementById('card-div');

    let htmlContent = `
        <div class="col-md-4 my-5 mx-auto generated-cards">
          <div class="card shadow-md">
            <img src="${generatedUser.picture}" class="card-img-top img-fluid user-image" alt="User Image #${generatedUser.id}">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><h5 class="card-title text-center">${generatedUser.firstName} ${generatedUser.lastName}</h5></li>
                <li class="list-group-item"><p class="card-text"><span class="fw-bold text-success">Username:</span> ${generatedUser.userName}</p></li>
                <li class="list-group-item"><p class="card-text"><a href="mailto:${generatedUser.email}">${generatedUser.email}</a></p></li>
                <li class="list-group-item"><p class="card-text"><span class="fw-bold">Date of Birth:</span> ${generatedUser.dateOfBirth}</p></li>
                ${this.humanUser.isStaff ? `<li class="list-group-item is-staff"><p class="card-text is-staff"><span class="fw-bold text-success">Staff Member:</span> <span class="text-decoration-underline text-danger fw-bolder">${generatedUser.isStaff ? 'Yes' : 'No'}</span></p></li>` : ''}
                ${generatedUser.isStaff ? `<li class="list-group-item"><p class="card-text"><span class="fw-bold text-success">Department:</span> ${generatedUser.department}</p></li>` : ''}
              </ul>
            </div>
            <div class="staff-button-div mx-auto">
            </div>
          </div>
        </div>
    `;

    cardContainer.innerHTML += htmlContent;
  }

  /**
   * This will be used to add a button to the card if the user is a staff member
   */
  addStaffButton() {
    const staffButtonDiv = document.querySelectorAll('.staff-button-div');
    let increment = 0;

    for (const staffButton of staffButtonDiv) {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-warning', 'staff-button', 'mb-3', 'animate__flash', 'animate__delay-2s', 'animate__slow', 'animate__infinite', 'animate__animated');
      button.textContent = 'Delete User';
      button.id = `staff-button-${increment++}`;
      staffButton.appendChild(button);
    }

    const staffButtons = document.querySelectorAll('.staff-button');
    staffButtons.forEach((staffButton) => {
      staffButton.addEventListener('click', (event) => {
        this.deleteUser(event.target);
      });
    });
  }

  /**
   * Method to remove the splash page once the user logs in
   */
  removeSplashPage() {
    // Remove the splash page
    const splashPage = document.getElementById('landing-page');
    splashPage.classList.add('animate__animated', 'animate__fadeOut');
    splashPage.addEventListener('animationend', () => {
      splashPage.remove();

      const elementsToAnimate = document.querySelectorAll('.generated-cards');
      elementsToAnimate.forEach((element) => {
        element.classList.add('animate__animated', 'animate__fadeIn');
      });
      setTimeout(() => {
        elementsToAnimate.forEach((element) => {
          element.classList.remove('animate__fadeIn');
        });
      }, 2000);
    });
  }

  /**
   * This method will delete users from the website via the Staff button
   */
  deleteUser(event) {
    // TODO: Maybe add a div to confirm the deletion?
    console.log('Deleting user... ', event.id);

    const card = event.closest('.generated-cards');

    if (card.querySelector('.is-staff').textContent.includes('Yes')) {
      console.log("You can't delete a staff member.");
      alert("You can't delete a staff member.");
    } else {
      card.remove();
    }
  }

  /**
   * Method to control the login button
   * It will change the button text and functionality based on the user's login status
   */
  controlLoginButton() {
    const navBarButton = document.getElementById('navbar-login-button');
    const adminOverrideButton = document.getElementById('admin-override');
    const parentElement = navBarButton.parentElement;

    if (this.humanUser.isLogged) {
      const newButton = document.createElement('button');
      newButton.textContent = 'Logout';
      newButton.id = 'navbar-login-button';
      newButton.classList.add('btn', 'btn-outline-danger');

      newButton.addEventListener('click', () => this.logoutUser());

      // Replace the old button with the new one
      parentElement.replaceChild(newButton, navBarButton);
    } else {
      navBarButton.textContent = 'Login';
      navBarButton.removeEventListener('click', () => this.logoutUser());
      navBarButton.addEventListener('click', () => this.loginUser());
    }


  }

  /**
   * Method to log in the user
   */
  loginUser() {
    //TODO: Clean up the end of this method, the logic is a bit convoluted
    this.humanUser.isLogged = true;
    this.bootstrapModal = new bootstrap.Modal(document.getElementById('login-modal'));
    this.bootstrapModal.show();

    const form = document.getElementById('login-form');
    const login = document.getElementById('first-name');
    const submitButton = document.getElementById('login-submit-button');
    const adminOverride = document.getElementById('admin-override');

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        console.log('Form is valid via loginUser().');
        this.humanUser.isLogged = true;
        this.controlLoginButton();
        this.bootstrapModal.hide();

        if (login.value === 'superuser') {
          console.log('Superuser logged in via loginUser()');
          this.humanUser.isStaff = true;
        } else {
          console.log('User logged in via loginUser().');
        }
      } else {
        console.log('Form is invalid.');
      }

      console.log('Is the user staff?', this.humanUser.isStaff);
      if (this.humanUser.isStaff) {
        for (const generatedUser of this.userGenerator.allUsers) {
          this.generateCard(generatedUser); // Generates a card for the user// Adds a "Staff" button to the user's card
        }
        this.addStaffButton();
      } else {
        let standardUser = this.userGenerator.allUsers[0];
        if (!standardUser.isStaff) {
          this.generateCard(standardUser);
        } else {
          // print the first user that is not staff
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
      for (const generatedUser of this.userGenerator.allUsers) {
        this.generateCard(generatedUser);
      }
      this.addStaffButton();
    });

  }

  /**
   * Method to log out the user
   */
  logoutUser() {
    console.log('Logging out...');
    this.humanUser.isLogged = false;
    this.humanUser.isStaff = false;
    document.body.innerHTML = document.body.innerHTML.match(/<script[^>]*>[\s\S]*?<\/script>/g).join('');
    this.startBuilding();
  }

  /**
   * Method to start building the website
   */
  startBuilding() {
    const mainContent = document.createElement('div');
    mainContent.setAttribute('id', 'main-content');
    document.body.insertBefore(mainContent, document.body.firstChild);

    this.createLandingPage();
    this.initializeBasicElements();
    this.initialize();
  }
}

const generateAutomation = () => {
  const USER_COUNT = 15;

  const humanUser = new HumanUser();
  const userGenerator = new UserGenerator();
  const website = new Website(humanUser, userGenerator);

  website.startBuilding();
  userGenerator.generateMultipleUsers(USER_COUNT);
}

generateAutomation();


