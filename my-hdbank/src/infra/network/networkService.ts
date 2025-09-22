import { v4 } from "uuid"

class Service {
    constructor() {

    }
    getPayload<T, P>({ data, restPayload, restDeviceInfo, language }: { data: P, restPayload?: Record<string, string | number>, restDeviceInfo?: Record<string, string | number>, language?: string }) {
        return {
            requestId: v4().toString(),
            channel: 'mfe-loan',
            ipRequest: '',
            language: language || 'vi',
            deviceInfo: 'Zalo Mini App',
            data: data,
            ...restPayload
        } as unknown as T
    }
}

export const commonService = new Service()