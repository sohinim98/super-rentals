import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

/** Here, we are writing the tests in a framework called QUnit,
 * which is where the functions module, test and assert come from
 * We also have additional helpers like click, visit, and currentURL
 * provided by the @ember/test-helpers package.
 *
 * http://localhost:7357/
 */

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  // instruct the test robot to navigate to the / URL of our app
  // landing page
  test('visiting /', async function (assert) {
    // wait until the page completely finishes loading before moving on to the next step.
    // almost always use async & await visit as a pair
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('Welcome to Super Rentals!');
    // look inside the tag with the jumbo class for an <a> tag with the button class
    // same as css
    assert.dom('.jumbo a.button').hasText('About Us');
    // click
    await click('.jumbo a.button');
    assert.equal(currentURL(), '/about');
  });
  // about
  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.equal(currentURL(), '/about');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('About Super Rentals');

    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');

    assert.equal(currentURL(), '/getting-in-touch');
  });
  // contact
  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');

    assert.equal(currentURL(), '/getting-in-touch');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('Contact Us');

    assert.dom('.jumbo a.button').hasText('About');
    await click('.jumbo a.button');

    assert.equal(currentURL(), '/about');
  });
  /** We could write a component test for the <NavBar> by itself,
   * like we just did for the <Jumbo> component.
   * However, since the job of <NavBar> is to navigate us around the app,
   * it would not make a lot of sense to test this particular component in isolation.
   * So, let's go back to writing some acceptance tests!
   */
  test('navigating using the nav-bar', async function (assert) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('SuperRentals');
    assert.dom('nav a.menu-about').hasText('About');
    assert.dom('nav a.menu-contact').hasText('Contact');

    await click('nav a.menu-about');
    assert.equal(currentURL(), '/about');

    await click('nav a.menu-contact');
    assert.equal(currentURL(), '/getting-in-touch');

    await click('nav a.menu-index');
    assert.equal(currentURL(), '/');
  });
});
