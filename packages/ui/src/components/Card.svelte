<script>
  // component props
  // Camel case not supported for props, see drawback section.
  export let card_title, card_desc, card_img
</script>
<!-- <svelte:options tag="card-test"/> -->
<main>
  <div class="card-container">
    <div class="card">
      <img src={card_img} alt="My product" />
      <div class="card-body">
        <div class="row">
          <div class="card-title">
            <h2>{card_title}</h2>
          </div>
        </div>
        <p>
          {card_desc}
        </p>
        <button>Do Something</button>
      </div>
    </div>
  </div>
</main>

<style>
  .card {
    max-width: 350px;
    border-radius: 5px;
    box-shadow: 0 4px 6px 0 #00000033;
    padding: 0 0 10px 0;
  }

  .card img {
    width: 100%;
    height: auto;
  }

  .card-body {
    padding: 5px 10px;
  }

  .card-body p {
    color: #575757;
    margin-bottom: 20px;
    font-size: 14px;
  }
</style>

<!-- 
ConnectKit
src/
/assets
/components
/constants
--/hooks
/localization
/styles
/utils
/wallets

Rainbowkit
assets/
src/
/components
/css
/hooks
/themes
/transactions???
/utils
/wallets

PrismUI
src/
/assets
/components
/themes
/utils
/wallets

 -->