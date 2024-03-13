/**
 * This Class is responsible for generating user data using the Random User Generator API.
 */
class UserGenerator {
  constructor() {
    console.log('\nUserGenerator instance created.\n\n');
    this.usersObjArray = []; // Array to hold generated user data
    this.employeeID = 1; // Unique ID for each user (employee1, employee2, etc.)
    this.STAFFCOUNT = 4; // Number of staff members + 1 (for the first 3 users)

  }

  /**
   * Method to generate a single user
   * @returns - A user object
   */
  async generateUser() {
    try {
      const response = await fetch('https://randomuser.me/api/?inc=name,email,picture,dob');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const user = data.results[0]; // Extracting the first user

      return {
        firstName: user.name.first,
        lastName: user.name.last,
        dateOfBirth: user.dob.date,
        email: user.email,
        userName: `employee${this.employeeID++}`,
        // isStaff will be true for the first 3 users, and false for the rest
        isStaff: this.employeeID <= this.STAFFCOUNT,
        picture: user.picture.large
      };

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  /**
   * Method to generate multiple users
   * @param count - The number of users to generate
   */
  async generateMultipleUsers(count) {
    for (let i = 0; i < count; i++) {
      const user = await this.generateUser();
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
  get isLoggedIn() {
    return this.isLogged;
  }

  /**
   * Sets the user's login status
   */
  set isLoggedIn(status) {
    this.isLogged = status;

    if (status) {
      console.log('Setting user as logged in.');
      this.isLogged = true;
    } else {
      console.log('Setting user as logged out.');
      this.isLogged = false;
    }
  }

  /**
   * Confirms that the user is a staff member
   * @returns - True if the user is a staff member, false otherwise
   */
  get isStaffMember() {
    return this.isStaff;
  }

  createAccount() {
    this.userName = `superuser`;
    this.password = `password`;
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
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'bg-dark');
    navbar.setAttribute('data-bs-theme', 'dark');

    navbar.innerHTML = `
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Placeholder Website Name</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
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
    document.body.appendChild(containerDiv);

    const footer = document.createElement('footer');
    footer.classList.add('bg-dark', 'text-center', 'text-white', 'py-3');
    footer.innerHTML = `
      <div class="container">
        <p class="mx-auto my-auto">Copyright &copy; Kiefer&trade;</p>
      </div>
    `;

    document.body.appendChild(footer);
  }

  /**
   * This is the first thing the user sees when they visit the website.
   * A modal will pop up and ask the user to log in.
   */
  createLandingPage() {
    const landingPage = document.createElement('div');
    landingPage.classList.add('container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'min-vh-100');
    landingPage.id = 'landing-page';
    landingPage.innerHTML = `
      <h1 class="display-1">Welcome to our website!</h1>
<!--      <button id="splash-page-login-button" class="btn btn-primary">Login</button>-->
    `;

    document.body.appendChild(landingPage);
  }

  /**
   * Method to initialize the login process.
   * It creates a modal and listens for a click event on the login button.
   */
  initialize() {
    console.log('\nInitializing login elements...\n\n');
    const modalDialog = document.querySelector('.modal-dialog');

    this.controlLoginButton();

    // Ensure modal is only created once
    if (!modalDialog) {
      console.log('Modal does not exist. Creating modal...');
      this.createLoginModal();
    }
  }

  /**
   * Method to create a modal.
   * That is, a form for user to login.
   */
  createLoginModal() {
    console.log('\nCreating login modal...\n\n');
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
                                   required pattern="^[A-Za-z]+$" value="k">
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
                                   required pattern="^[A-Za-z]+$" value="k">
                            <div class="valid-feedback text-center">Valid.</div>
                            <div class="invalid-feedback text-center">Please fill out this field.</div>
                        </div>
                    </form>
                    <div class="d-flex flex-column justify-content-center mb-3" id="login-response">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="login-submit-button">Submit</button>
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

    this.htmlContent = `
        <div class="col-md-4 my-5 mx-auto generated-cards">
          <div class="card">
            <img src="${generatedUser.picture}" class="card-img-top" alt="User Image">
            <div class="card-body">
              <h5 class="card-title">${generatedUser.firstName} ${generatedUser.lastName}</h5>
              <p class="card-text">Username: ${generatedUser.userName}</p>
              <p class="card-text">Email: ${generatedUser.email}</p>
              <p class="card-text">Date of Birth: ${generatedUser.dateOfBirth}</p>
              <p class="card-text is-staff">Staff Member: ${generatedUser.isStaff ? 'Yes' : 'No'}</p>
            </div>
            <div class="staff-button-div">
            </div>
          </div>
        </div>
    `;

    cardContainer.innerHTML += this.htmlContent;
  }

  /**
   * This will be used to add a button to the card if the user is a staff member
   */
  addStaffButton() {
    console.log('Adding staff button...')
    const staffButtonDiv = document.querySelectorAll('.staff-button-div');
    let increment = 0;

    for (const staffButton of staffButtonDiv) {
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-primary', 'staff-button');
      button.textContent = 'Staff';
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
    splashPage.remove();
  }

  /**
   * This method will delete users from the website via the Staff button
   */
  deleteUser(event) {
    console.log('Deleting user...');
    console.log('Button clicked:', event.id);

    const card = event.closest('.generated-cards');

    // if the card has class "is-staff" and the value is "Yes", console.log("You can't delete a staff member.")
    if (card.querySelector('.is-staff').textContent.includes('Yes')) {
      console.log("You can't delete a staff member.");
    } else {
      card.remove();
    }
  }

  controlLoginButton() {
    const navBarButton = document.getElementById('navbar-login-button');

    // Remove any existing event listeners by cloning the button
    // const newNavBarButton = navBarButton.cloneNode(true);
    // navBarButton.parentNode.replaceChild(newNavBarButton, navBarButton);

    if (this.humanUser.isLogged) {
      navBarButton.textContent = 'Logout';
      navBarButton.addEventListener('click', () => this.logoutUser());
    } else {
      navBarButton.textContent = 'Login';
      navBarButton.addEventListener('click', () => this.loginUser());
    }
  }

  loginUser() {
    console.log('\nLogin button clicked.\n\n');
    this.humanUser.isLogged = true;
    this.bootstrapModal = new bootstrap.Modal(document.getElementById('login-modal'));
    this.bootstrapModal.show();

    const form = document.getElementById('login-form');
    const login = document.getElementById('first-name');
    const submitButton = document.getElementById('login-submit-button');

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
        // Only print one user, and all the staff members
        this.generateCard(this.userGenerator.allUsers[0]);
        for (const generatedUser of this.userGenerator.allUsers) {
          if (generatedUser.isStaff) {
            this.generateCard(generatedUser);
          }
        }
      }

      this.removeSplashPage();
    });
  }

  logoutUser() {
    location.reload();
  }
}

//TODO: RChange Logout button and swap with new button to break the modal
//TODO: remove the modal HTML and place it in the method
//TODO: Edit Navbar
//TODO: Goldplate the website

document.addEventListener('DOMContentLoaded', async function () {
  const USER_COUNT = 10;

  const humanUser = new HumanUser();
  const userGenerator = new UserGenerator();
  const website = new Website(humanUser, userGenerator);

  await userGenerator.generateMultipleUsers(USER_COUNT);

  website.createLandingPage();
  website.initializeBasicElements();
  website.initialize();

  humanUser.createAccount();
});


