<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../../inc/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <link rel="stylesheet" href="/nft/studio/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Royalties | Infinex NFT Studio</title>
    </head>
    <body>
    
        <?php include('../../../inc/body.php'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            
            <div class="row">
                <h3>Royalties</h3>
            </div>
            
            <div id="royalties-data" class="row">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/studio/js/royalties.js?<?php echo filemtime(__DIR__.'/js/royalties.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
