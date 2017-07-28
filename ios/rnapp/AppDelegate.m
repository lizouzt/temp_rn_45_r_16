/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "ReactNativeAutoUpdater.h"

#define JS_CODE_METADATA_URL @"https://xxx.codoon.com/git/bundle/update.json"

@interface AppDelegate() <ReactNativeAutoUpdaterDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/main" withExtension:@"jsbundle"];

  /*
   *  Updater
   * */
  ReactNativeAutoUpdater* updater = [ReactNativeAutoUpdater sharedInstance];
  [updater setDelegate:self];
  
  NSURL* defaultMetadataFileLocation = [[NSBundle mainBundle] URLForResource:@"bundle/metadata" withExtension:@"json"];
  [updater initializeWithUpdateMetadataUrl:[NSURL URLWithString:JS_CODE_METADATA_URL]
                     defaultJSCodeLocation:jsCodeLocation
               defaultMetadataFileLocation:defaultMetadataFileLocation];
  [updater setHostnameForRelativeDownloadURLs:@"https://xxx.codoon.com"];
  [updater checkUpdate];
  
  NSURL* latestJSCodeLocation = [updater latestJSCodeLocation];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  self.window.rootViewController = rootViewController;
  [self createReactRootViewFromURL:latestJSCodeLocation];
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)createReactRootViewFromURL:(NSURL*)url {
  // Make sure this runs on main thread. Apple does not want you to change the UI from background thread.
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTBridge* bridge = [[RCTBridge alloc] initWithBundleURL:url moduleProvider:nil launchOptions:nil];
    RCTRootView* rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"rnapp" initialProperties:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    self.window.rootViewController.view = rootView;
  });
}

#pragma mark - ReactNativeAutoUpdaterDelegate methods

- (void)ReactNativeAutoUpdater_updateDownloadedToURL:(NSURL *)url {
  UIAlertController *alertController = [UIAlertController
                                        alertControllerWithTitle:NSLocalizedString(@"Update Downloaded", nil)
                                        message:NSLocalizedString(@"An update was downloaded. Do you want to apply the update now?", nil)
                                        preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction *cancelAction = [UIAlertAction
                                 actionWithTitle:NSLocalizedString(@"Cancel", @"Cancel action")
                                 style:UIAlertActionStyleCancel
                                 handler:^(UIAlertAction *action)
                                 {
                                   NSLog(@"Cancel action");
                                 }];
  
  UIAlertAction *okAction = [UIAlertAction
                             actionWithTitle:NSLocalizedString(@"OK", @"OK action")
                             style:UIAlertActionStyleDefault
                             handler:^(UIAlertAction *action)
                             {
                               [self createReactRootViewFromURL: url];
                             }];
  
  [alertController addAction:cancelAction];
  [alertController addAction:okAction];
  
  // make sure this runs on main thread. Apple doesn't like if you change UI from background thread.
  dispatch_async(dispatch_get_main_queue(), ^{
    [self.window.rootViewController presentViewController:alertController animated:YES completion:nil];
  });
  
}

- (void)ReactNativeAutoUpdater_updateDownloadFailed {
  NSLog(@"Update failed to download");
}

@end





