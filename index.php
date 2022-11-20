<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../templates/head.php'); ?>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos NFT Studio</title>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include('../../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 h-rest pt-2 p-0">
        
            <div class="row h-rest m-0">
                <div class="col-12 col-lg-6 me-auto my-auto px-4 py-5">
                    <div class="row">
                        <div class="col-12 jumbotron">
                            <h3>Vayamos</h3>
                            <h1>NFT Studio</h1>
                            <p>
	                            NFT creation made simple
                            </p>
                        </div>
                        <div class="col-9 mx-auto d-none d-lg-block">
                            <img src="/nft/studio/img/studio_jumbotron.png" class="img-fluid">
                        </div>
                    </div>
                </div>
            
                <div class="col-12 col-lg-5 p-0 my-auto">
                    <div class="p-2 p-lg-4 ui-card-light rounded">
                        <div id="bridge-step1">
                            <div class="row pt-1 pb-3">
                                <div class="col-6 ps-2 pe-1">
                                    <button type="button" class="btn btn-primary w-100 peg-toggle" data-side="peg-in">Peg-in</button>
                                </div>
                                <div class="col-6 ps-1 pe-2">
                                    <button type="button" class="btn btn-secondary w-100 peg-toggle" data-side="peg-out">Peg-out</button>
                                </div>
                            </div>
                            <div class="row pt-3">
                                <h3 class="peg-in-text">Asset to peg-in:</h3>
                                <h3 class="peg-out-text">Asset to peg-out:</h3>
                            </div>
                            <div class="row pb-3">
                                <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                            </div>
                            <div class="row pt-3">
                                <h3 class="peg-in-text">Source network:</h3>
                                <h3 class="peg-out-text">Destination network:</h3>
                            </div>
                            <div class="row pb-3">
                                <?php include(__DIR__.'/../../templates/select_net.php'); ?>
                            </div>
                            <div class="row pt-3">
                                <h3>Destination address:</h3>
                            </div>
                            <div class="row pb-3">
                                <form>
                                <input id="peg-target-addr" type="text" placeholder="Paste address" class="form-control" autocomplete="off" readonly>
                                </form>
                                <small id="help-target-addr" class="form-text" style="display: none">Address is invalid</small>
                            </div>
                            <div class="row pt-3 peg-memo-wrapper">
                                <h3 id="peg-memo-name"></h3>
                            </div>
                            <div class="row pb-3 peg-memo-wrapper">
                                <form>
                                <input type="text" class="form-control" id="peg-target-memo" placeholder="Optional">
                                </form>
                                <small id="help-target-memo" class="form-text" style="display: none">Invalid format</small>
                            </div>
                            <div class="row pb-3 flex-nowrap">
                                <div class="col-auto me-auto">
                                    <h5 class="secondary">Fee:</h5>
                                </div>
                                <div class="col-auto">
                                    <span class="peg-fee-val">-</span>
                                    <span class="peg-fee-assetid"></span>
                                </div>
                            </div>
                            <div class="row pt-3 pb-1">
                                <form id="peg-step1-form">
                                    <button type="submit" class="btn btn-primary d-block ms-auto w-25">Submit</button>
                                </form>
                            </div>
                        </div>
                        
                        <div id="bridge-preloader">
                            <div class="row py-2 text-center h-100">
                                <i class="fa-solid fa-spinner fa-spin-pulse fa-2x my-auto"></i>
                            </div>
                        </div>
                        
                        <div id="bridge-step2">
                            <div class="row pt-1 pb-3">
                                <h3>Your bridge has been created!</h3>
                            </div>
                            <div class="row py-3 flex-nowrap justify-content-evenly">
                                <div class="col-auto text-center">
                                    <div class="p-2 rounded text-center" style="background-color: var(--color-input); min-width: 100px;">
                                        <img id="peg-from-net-img" class="p-2" width="40" height="40" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                                        <br>
                                        <span id="peg-from-net" class="p-2 secondary"></span>
                                    </div>
                                </div>
                                <div class="col-auto my-auto">
                                    <i class="fa-solid fa-arrow-right fa-2x"></i>
                                </div>
                                <div class="col-auto text-center">
                                    <div class="p-2 rounded text-center" style="background-color: var(--color-input); min-width: 100px;">
                                        <img id="peg-to-net-img" class="p-2" width="40" height="40" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
                                        <br>
                                        <span id="peg-to-net" class="p-2 secondary"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row pt-3">
                                <h3>Deposit funds to this address:</h3>
                            </div>
                            <div class="row">
                                <div class="col-12 px-4">
                                    <div class="row py-2 flex-nowrap rounded" style="background-color: var(--color-input);">
                                        <div class="col-auto my-auto wrap">
                                            <span class="wrap" id="peg-deposit-addr"></span>
                                        </div>
                                        <div class="col-auto my-auto">
                                            <a href="#_" class="secondary" data-copy="#peg-deposit-addr" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="peg-deposit-memo-wrapper">
                                <div class="row pt-3">
                                    <h3 id="peg-deposit-memo-name"></h3>
                                </div>
                                <div class="row">
                                    <div class="col-12 px-4">
                                    <div class="row py-2 flex-nowrap rounded" style="background-color: var(--color-input);">
                                        <div class="col-auto my-auto wrap">
                                            <span class="wrap" id="peg-deposit-memo"></span>
                                        </div>
                                        <div class="col-auto my-auto">
                                            <a href="#_" class="secondary" data-copy="#peg-deposit-memo" onClick="copyButton(this); event.stopPropagation();"><i class="fa-solid fa-copy fa-xl"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div class="row pt-3 flex-nowrap">
                                <div class="col-auto me-auto">
                                    <h5 class="secondary">Confirmations required:</h5>
                                </div>
                                <div id="peg-conf-target" class="col-auto">
                                    -
                                </div>
                            </div>
                            <div class="row pb-3 flex-nowrap">
                                <div class="col-auto me-auto">
                                    <h5 class="secondary">Fee:</h5>
                                </div>
                                <div class="col-auto">
                                    <span class="peg-fee-val">-</span>
                                    <span class="peg-fee-assetid"></span>
                                </div>
                            </div>
                            
                            <div class="row py-3">
                                <div class="col-auto my-auto text-center" style="width: 60px">
                                    <i style="color: var(--color-ultra)" class="fa-solid fa-infinity fa-2x"></i>
                                </div>
                                <div class="col small my-auto">
                                    Once created bridge is valid forever and can be used unlimited number of times.
                                    <br>
                                    You don't have to worry about the address expiry date.
                                </div>
                            </div>
                            <div class="row py-3">
                                <div class="col-auto my-auto text-center" style="width: 60px">
                                    <i style="color: var(--color-ultra)" class="fa-solid fa-money-check-dollar fa-2x"></i>
                                </div>
                                <div class="col small my-auto">
                                    Deposit any amount to transfer tokens between networks.
                                    <br>
                                    The fee shown above will be deducted from the deposited amount.
                                </div>
                            </div>
                            <div class="row pt-3 pb-1">
                                <div class="col-auto my-auto text-center" style="width: 60px">
                                    <i style="color: var(--color-ultra)" class="fa-solid fa-triangle-exclamation fa-2x"></i>
                                </div>
                                <div class="col small my-auto">
                                    If the deposit amount is not enough to pay the fee, the funds will be waiting for
                                    <br>
                                    the next transaction to this bridge
                                </div>
                            </div>
                            
                        </div>                  
                    </div>
                </div>
                
                <div class="col-7 mx-auto py-5 d-lg-none">
                    <img src="/nft/studio/img/studio_jumbotron.png" class="img-fluid">
                </div>

            </div>
        
        <!-- / Root container -->
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-buy">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to purchase the Mining Cloud contract?
                        <br>
                        The amount of <span id="mcb-price"></span> will be charged from your Vayamos account.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="mcb-buy" type="button" class="btn btn-primary">Buy</button>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include('../../../templates/modals.php'); ?>
        <script src="/nft/js/render_offer.js?<?php echo filemtime(__DIR__.'/../js/render_offer.js'); ?>"></script>
        <script src="/nft/js/index.js?<?php echo filemtime(__DIR__.'/../js/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../../templates/footer.html'); ?>
        <?php include(__DIR__.'/../templates/mobile_nav.php'); ?>
    
    </body>
</html>
