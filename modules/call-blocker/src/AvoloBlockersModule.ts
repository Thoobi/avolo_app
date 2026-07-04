import { NativeModule, requireNativeModule } from 'expo';

declare class AvoloBlockersModule extends NativeModule<{}> {}

export default requireNativeModule<AvoloBlockersModule>('AvoloBlockers');
