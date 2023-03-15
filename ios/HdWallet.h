
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNHdWalletSpec.h"

@interface HdWallet : NSObject <NativeHdWalletSpec>
#else
#import <React/RCTBridgeModule.h>

@interface HdWallet : NSObject <RCTBridgeModule>
#endif

@end
