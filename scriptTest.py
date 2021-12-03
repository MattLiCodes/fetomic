from __future__ import print_function
import scipy.io.wavfile as wavfile
import scipy
import scipy.fftpack
from scipy.signal import find_peaks, butter, find_peaks_cwt
import numpy as np
from matplotlib import pyplot as plt
from scipy.io.wavfile import read


def calc_distances(sound_file):
    min_val = 5000

    fs, data = read(sound_file)
    data_size = len(data)

    focus_size = int(0.18 * fs)

    focuses = []
    distances = []
    idx = 0

    while idx < len(data):
        if data[idx] > min_val:
            mean_idx = idx + focus_size // 2
            focuses.append(float(mean_idx) / data_size)
            if len(focuses) > 1:
                last_focus = focuses[-2]
                actual_focus = focuses[-1]
                distances.append(actual_focus - last_focus)
            idx += focus_size
        else:
            idx += 1
    return distances


fs_rate, signal = wavfile.read("soundwaveeq.wav")
print("Frequency sampling", fs_rate)
l_audio = len(signal.shape)
print("Channels", l_audio)
if l_audio == 2:
    signal = signal.sum(axis=1) / 2
N = signal.shape[0]
print("Complete Samplings N", N)
secs = N / float(fs_rate)
print("secs", secs)
Ts = 1.0/fs_rate  # sampling interval in time
print("Timestep between samples Ts", Ts)
t = np.arange(0, secs, Ts)  # time vector as scipy arange field / numpy.ndarray
FFT = abs(scipy.fft.fft(signal))
FFT_side = FFT[range(N//2)]  # one side FFT range
freqs = scipy.fftpack.fftfreq(signal.size, t[1]-t[0])
fft_freqs = np.array(freqs)
freqs_side = freqs[range(N//2)]  # one side frequency range
fft_freqs_side = np.array(freqs_side)
plt.subplot(311)
p1 = plt.plot(t, signal, "g")
plt.xlabel('Time')
plt.ylabel('Amplitude')
plt.subplot(312)
p2 = plt.plot(freqs, FFT, "r")
plt.xlabel('Frequency (Hz)')
plt.ylabel('Count dbl-sided')
plt.subplot(313)
p3 = plt.plot(freqs_side, abs(FFT_side), "b")
plt.xlabel('Frequency (Hz)')
plt.ylabel('Count single-sided')
plt.show()

peaks, _ = find_peaks_cwt(signal, np.arange(1, 1500))
plt.subplot(1, 1, 1)
plt.plot(peaks, signal[peaks], "ob")
plt.plot(signal)
plt.legend(['prominence'])
