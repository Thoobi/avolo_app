import { registerWebModule, NativeModule } from 'expo';

class AvoloBlockersModule extends NativeModule<{}> {}

export default registerWebModule(AvoloBlockersModule, 'AvoloBlockersModule');
